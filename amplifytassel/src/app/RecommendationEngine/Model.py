import numpy as np
import json
from sentence_transformers import SentenceTransformer, util
from time import time as time
import logging

print("Beginning Model Initialization")

pre_init = time()
model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2', cache_folder = "/tmp/")
post_init = time()

print("Took:", post_init - pre_init, "s to load Model.")

def recommendation_engine(event, context):
    # Respond to preflight request with 200.
    if event["httpMethod"] == "OPTIONS":
       return {
          "statusCode": 200
       }

    if "body" not in event:
       return {
          "statusCode": 400
       }
    # get the opportunities' and user info.

    try:
      event = json.loads(event["body"])
    except Exception as error:
       print("Error:", error, "Event Body not loading properly:", event["body"])
       return {
          "statusCode": 500
       }

    user = event["users"][0]
    events = event['events']

    print("User:", user)
    print("Events:", events)

    user_text = user['description'] + ' ' + user['volunteerExp'] + ' ' + user["workExp"]
    events_text = [event['description'] + ' ' + ' ' + event['subject'] + ' ' + event['eventData'] + ' ' + event['eventName'] for event in events]
    events_tags = [event["tags"] for event in events]
    event_ids = [event["eventID"] for event in events]

    print("Extracted fields")

    print("USER")

    user_embeddings = weight_tags([user_text], [user['tags']])
    print("Events Text:", events_text, "Events Tags:", events_tags)
    print("EVENTS")
    event_embeddings = weight_tags(events_text, events_tags)

    print("Embeddings")
    user_embeddings = user_embeddings.astype(np.float32)
    event_embeddings = event_embeddings.astype(np.float32)
    similarity_scores = util.pytorch_cos_sim(user_embeddings, event_embeddings)

    print("Similarity Scores")
    
    _, sorted_event_ids = list(
        zip(
            *sorted(
                zip(similarity_scores[0], event_ids, strict = True), reverse = True, key = lambda event: event[0]
            )
        )
    )

    print({"order": sorted_event_ids})

    return {
       "statusCode": 200,
       "body": json.dumps({"order": sorted_event_ids})
    }

def weight_tags(texts, entities_tags, tag_weight=2.0,text_weight=1.0):
    text_embeddings = model.encode(texts) * text_weight

    print("Text Embedding Type:", text_embeddings.dtype)
    tags_embeddings = []

    if len(entities_tags) == 0:
      print("No tags")
      return text_embeddings / text_weight

    for entity_tags in entities_tags:
      if entity_tags:
        tag_embedding = np.mean(model.encode(entity_tags), axis = 0).reshape(1, -1)
      else:
        tag_embedding = np.zeros((1, 384))

      tags_embeddings.append(tag_embedding)

    tags_embeddings = np.concatenate(tags_embeddings)

    print("Tag Embedding Type:", tags_embeddings.dtype)

    return (text_embeddings + tags_embeddings)/(tag_weight + text_weight)