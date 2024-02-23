import numpy as np
import json
from sentence_transformers import SentenceTransformer, util

model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

# @app.route('/recommendations_endpoint', methods=['GET', 'POST'])
def recommendations_engine(event, context):
    # get the opportunites and user info.

    user = event["users"][0]
    events = event['events']

    # Creating a shared column that contains all the properties of 
    # User and Event
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

# Testing Example:

# if __name__ == "__main__":
#     users = [
#             {
#                 "description": "I am an Alumni, I studied Computer Science and work on Natural Language Processing.",
#                 "volunteerExp": "",
#                 "workExp": "I tutored students on Spiking Neural Networks.",
#                 "tags": [
#                     "Engineering",
#                     "Mathematics",
#                     "Music",
#                     "Philosophy",
#                     "Physics",
#                     "Tutoring"
#                 ]
#             }
#         ]

#     events = [
#         {
#             "eventID": "748f5b4f-e354-4cf0-ac4d-af7a76c1bdae",
#             "eventName": "UCSC College Art Fair",
#             "description": "Join us for an exhilarating celebration of creativity at the \"Expressions Unleashed\" College Art Fair, hosted by the University of California, Santa Cruz (UCSC). This event is a vibrant showcase of artistic talent, featuring a diverse array of works from the next generation of artists and creators. Immerse yourself in a kaleidoscope of colors, styles, and perspectives as our talented students bring their visions to life. We are calling upon the artistic community of UCSC alumni to make \"Expressions Unleashed\" a truly unforgettable experience! If you're a UCSC alumnus with a background in the arts and are passionate about supporting the next generation of artists, we invite you to volunteer your time and expertise.",
#             "eventData": "None",
#             "subject": "Art",
#             "tags": [
#                 "Art",
#                 "Mentoring"
#             ]
#         },
#         {
#             "eventID": "c03749bb-24ec-42b8-8561-a5a5caf62e9d",
#             "eventName": "Car Crash Test",
#             "description": "We need someone to floor it into a concrete wall and so we record the injuries they get. I would do it but uhh.. I'm uhh... sick",
#             "eventData": "Pays $2000 but only if you live ;)",
#             "subject": "art",
#             "tags": [
#                 "Physics",
#                 "STEM",
#                 "Technology & Innovation"
#             ]
#         },
#         {
#             "eventID": "38674c64-06c3-42ac-9863-1166f5ab31c7",
#             "eventName": "Confronting Climate Change",
#             "description": "Confronting Climate Change is an annual public event that brings together scientists, artists, policy experts, and community members to discuss our planet’s well-being and share solutions for our future. We are looking for presenters to discuss the social and economic transformations that will be required in order to address the health impacts of climate change.",
#             "eventData": "None",
#             "subject": "Community Studies",
#             "tags": [
#                 "Clean-Up Events",
#                 "Environmental Conservation",
#                 "Environmental Science",
#                 "Political Activism",
#                 "Student Activities"
#             ]
#         },
#         {
#             "eventID": "618bb57e-4d34-4ce3-b216-184f79a7aed1",
#             "eventName": "Natural Living",
#             "description": "This is nuts",
#             "eventData": "Free penut butter",
#             "subject": "art",
#             "tags": []
#         },
#         {
#             "eventID": "e26cb2b8-1a8f-41aa-b3c0-66a8568cb808",
#             "eventName": "DNA Day @ UCSC",
#             "description": "This is a fun, celebratory event geared toward anyone and everyone who is interested in learning about the science of DNA. We are looking for past alumni to speak at our opening ceremony.",
#             "eventData": "None",
#             "subject": "Computer Science",
#             "tags": [
#                 "Biology",
#                 "STEM"
#             ]
#         },
#         {
#             "eventID": "ddbd0fb8-17d4-4da9-a2b1-aff57b4c0390",
#             "eventName": "Hackathon",
#             "description": "Hackathon",
#             "eventData": "None",
#             "subject": "Computer Science",
#             "tags": [
#                 "Engineering",
#                 "STEM",
#                 "Technology & Innovation"
#             ]
#         }
#     ]