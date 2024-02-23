import numpy as np
import json
from sentence_transformers import SentenceTransformer, util

model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

def handler(event, context):
    # get the opportunities' and user info.

    user = event["users"][0]
    events = event['events']

    user_text = user['description'] + ' ' + user['volunteerExp'] + ' ' + user["workExp"]
    events_text = [event['description'] + ' ' + ' ' + event['subject'] + ' ' + event['eventData'] + ' ' + event['eventName'] for event in events]
    events_tags = [event["tags"] for event in events]
    event_ids = [event["eventID"] for event in events]

    user_embeddings = weight_tags([user_text], user['tags'])
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
    for text, entity_tags in zip(texts, entities_tags):
        text_embedding = model.encode(text) * text_weight
        if entity_tags:
            # We could eliminate the dependency on Numpy if we just encode all the entities as one sequence (i.e. encode(" ".join(entity_tags))).
            tag_embeddings = np.mean([model.encode(tag) for tag in entity_tags], axis=0) * tag_weight
            combined_embedding = (text_embedding + tag_embeddings) / (tag_weight + text_weight)
        else:
            combined_embedding = text_embedding
        combined_embeddings.append(combined_embedding)
    return np.array(combined_embeddings)