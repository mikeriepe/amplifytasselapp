import numpy as np
import json
from sentence_transformers import SentenceTransformer, util
from time import time as time

pre_init = time()
model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')
post_init = time()

print("Took:", post_init - pre_init, "s to load Model.")

def recommendation_engine(event, context):
    # get the opportunities' and user info.

    user = event["users"][0]
    events = event['events']

    user_text = user['description'] + ' ' + user['volunteerExp'] + ' ' + user["workExp"]
    events_text = [event['description'] + ' ' + ' ' + event['subject'] + ' ' + event['eventData'] + ' ' + event['eventName'] for event in events]
    events_tags = [event["tags"] for event in events]
    event_ids = [event["eventID"] for event in events]

    user_embeddings = weight_tags([user_text], [user['tags']])
    event_embeddings = weight_tags(events_text, events_tags)

    similarity_scores = util.pytorch_cos_sim(user_embeddings, event_embeddings)
    
    _, sorted_event_ids = list(
        zip(
            *sorted(
                zip(similarity_scores[0], event_ids, strict = True), reverse = True, key = lambda event: event[0]
            )
        )
    )

    return json.dumps({"order": sorted_event_ids})

def weight_tags(texts, entities_tags, tag_weight=2.0,text_weight=1.0):
    combined_embeddings = []

    text_embeddings = model.encode(texts) * text_weight
    tags_embeddings = []

    for entity_tags in entities_tags:
      if entity_tags:
        tag_embedding = np.mean(model.encode(entity_tags), axis = 0).reshape(1, -1)
      else:
        tag_embedding = np.zeros((1, 384))

      tags_embeddings.append(tag_embedding)

    tags_embeddings = np.concatenate(tags_embeddings)

    return (text_embeddings + tags_embeddings)/(tag_weight + text_weight)

# if __name__ == "__main__":

#     recommendation_engine(
#         {
#     "users": [
#         {
#             "description": "test", 
#             "volunteerExp": "test", 
#             "workExp": "test", 
#             "tags": ["test", "test1", "test2"]
#         }
#     ],
#     "events": [
#         {
#             "description": "event", 
#             "subject": "test", 
#             "eventData": "test", 
#             "eventName": "test", 
#             "eventID": "1", 
#             "tags": ["event", "Event1"]
#         }
#     ]

# },
#         None
#     )