import numpy as np
import json
from sentence_transformers import SentenceTransformer, util
from time import time as time
import logging

pre_init = time()
model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2', cache_folder = "/tmp/")
post_init = time()

print("Took:", post_init - pre_init, "s to load Model.")

def event_to_volunteers(event, context):
    # Respond to preflight request with 200.
    if "httpMethod" in event and event["httpMethod"] == "OPTIONS":
       return {
          "statusCode": 200
       }

    if "body" not in event:
       print("No Body")
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

    users = event["users"]
    event = event['events'][0]

   #  print("Users:", users)
   #  print("Event:", event)

    users_text = [user['description'] + ' ' + user['volunteerExp'] + ' ' + user["workExp"] for user in users]
    event_text = [event['description'] + ' ' + ' ' + event['subject'] + ' ' + event['eventData'] + ' ' + event['eventName']]
    users_tags = [user["tags"] for user in users]
    event_tags = [event["tags"]]

    print("Extracted fields")

    print("USER")

    user_embeddings = weight_tags(users_text, users_tags)

    print("EVENTS")
    event_embeddings = weight_tags(event_text, event_tags)

    print("Embeddings")
    user_embeddings = user_embeddings.astype(np.float32)
    event_embeddings = event_embeddings.astype(np.float32)
    similarity_scores = util.pytorch_cos_sim(event_embeddings, user_embeddings)

    print("Similarity Scores:", similarity_scores.size())

    users_ids = [user["id"] for user in users]
    
    _, sorted_user_ids = list(
        zip(
            *sorted(
                zip(similarity_scores[0], users_ids, strict = True), reverse = True, key = lambda sim_user: sim_user[0]
            )
        )
    )

    print({"order": sorted_user_ids})

    return {
       "statusCode": 200,
       "body": json.dumps({"order": sorted_user_ids})
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