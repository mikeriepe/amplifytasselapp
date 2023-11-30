from flask import Flask, jsonify, request
import pandas as pd
import numpy as np
import json
from sentence_transformers import SentenceTransformer, util
from flask_cors import CORS

app = Flask(__name__)
model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')
CORS(app)

@app.route('/')
def hello_world():
	return 'Hello World!'

@app.route('/getHello', methods=['GET'])
def hello_world2():
	return 'Hello World the second!'

@app.route('/recommendations_endpoint', methods=['GET', 'POST'])
def recommendationsEngine():
    # get the opportunites and user info.
    data = request.get_json()

    user_df = pd.DataFrame(data['users'])
    event_df = pd.DataFrame(data['events'])

    # Creating a shared column that contains all the properties of 
    # User and Event
    user_df['all_text'] = user_df['description'] + ' ' + user_df['volunteerExp'] + ' ' + user_df["workExp"]
    event_df['all_text'] = event_df['description'] + ' ' + ' ' + event_df['subject'] + ' ' + event_df['eventData'] + ' ' + event_df['eventName']
    
    user_embeddings = model.encode(user_df.loc[0]['all_text'], convert_to_tensor=True)
    event_embeddings = model.encode(event_df['all_text'], convert_to_tensor=True)

    similarity_scores = util.pytorch_cos_sim(user_embeddings, event_embeddings)
    ret = []
    for i,n in enumerate(similarity_scores[0]):
        ret.append((n, event_df.loc[i]['eventID']))
    
    ret = sorted(ret)[::-1]
    eventIDs = {"order" : []}
    for _, eID in ret:
        eventIDs["order"].append(eID)
    
    return json.dumps(eventIDs)

if __name__ == "__main__":
	app.run()
