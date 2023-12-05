import unittest
from Model import app

# In order to run the Flask Webserver you just need to call python3 testFlaskWebserver.py
class FlaskTest(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()

    def test_hello_world(self):
        response = self.app.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, b'Hello World!')

    def test_hello_world2(self):
        response = self.app.get('/getHello')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, b'Hello World the second!')

    def test_recommendationsEngine(self):
        mock_data = {
            'users': [{'description': 'test', 'volunteerExp': 'test', 'workExp': 'test', "tags": []}],
            'events': [{'description': 'event', 'subject': 'test', 'eventData': 'test', 'eventName': 'test', 'eventID': '1', "tags": []}]
        }
        response = self.app.post('/recommendations_endpoint', json=mock_data)
        self.assertEqual(response.status_code, 200)
    
    #Test one for the Recommendation Engine
    def test_recommendationsEngine_with_Tags_1(self):
        users = {
            "users" :[
                {
                    "description" : "I am a person that loves talking to kids, and mentoring people. Additionally, I like going on long runs to help me be more fit, and I am a huge proponent of giving back to the community",
                    "tags": ['Art', 'Biology', "Children's Programs"],
                    "volunteerExp": "I have a strong penchant for creating engaging lesson plans and fostering critical thinking in my students. Outside the classroom, I enjoy reading, traveling, and volunteering for community events.",
                    "workExp": "I'm a teacher with a passion for education. I excel in classroom management and curriculum development. I'm at my best when working with students in a diverse learning environment."
                }
            ]
        }
        opportunities = {
            "events":
            [
                {
                    "description" : "Assist in organizing and facilitating guest lectures on various topics.",
                    "eventData" : "Open to all volunteers. No specific skills or age requirements.",
                    "eventID" : "b4c2e582-f234-4fdc-8843-54cb048015bb",
                    "eventName" : "Campus Lecture Series",
                    "subject" : "Education", 
                    "tags" : []
                },
                {
                    "description" : "Hackathon",
                    "eventData" : "None",
                    "eventID" : "ddbd0fb8-17d4-4da9-a2b1-aff57b4c0390",
                    "eventName" : "Hackathon",
                    "subject" : "Computer Science",
                    "tags" : ['Engineering', 'STEM', 'Technology & Innovation']
                },
                {
                    "description": "Join us for an exhilarating celebration of creativity at the \"Expressions Unleashed\" College Art Fair, hosted by the University of California, Santa Cruz (UCSC). This event is a vibrant showcase of artistic talent, featuring a diverse array of works from the next generation of artists and creators. Immerse yourself in a kaleidoscope of colors, styles, and perspectives as our talented students bring their visions to life. We are calling upon the artistic community of UCSC alumni to make \"Expressions Unleashed\" a truly unforgettable experience! If you're a UCSC alumnus with a background in the arts and are passionate about supporting the next generation of artists, we invite you to volunteer your time and expertise.",
                    "eventData": "None",
                    "eventID" : "748f5b4f-e354-4cf0-ac4d-af7a76c1bdae",
                    "eventName" : "UCSC College Art Fair",
                    "subject" : "Art",
                    "tags" : ['Art', 'Mentoring']
                },
                {
                    "description" : "Baskin Day is an annual student-run event open to everyone, where we celebrate the achievements and community of students and faculty within the Jack Baskin School of Engineering. This annual event is a great way to meet new people who share your interests and just an all-around fun time! In addition to showcasing engineering research and student organizations, Baskin Day will also be hosting a recruiting fair and several fun activities, like an engineering-themed Jeopardy! game show. We are looking for Baskin Engineering alumni to come and speak about their industry experiences with the students.",
                    "eventData" : "None",
                    "eventID" : "3b81c607-bbae-4489-9b89-0d786f0b5164",
                    "eventName" : "Baskin Day",
                    "subject" : "Computer Science",
                    "tags": ['Engineering', 'Mentoring', 'STEM', 'Technology & Innovation']
                }
            ]
        }
        mock_data = {
                     "users" : users["users"],
                     "events": opportunities["events"]
                    }

        response = self.app.post('/recommendations_endpoint', json=mock_data)
        self.assertEqual(response.status_code, 200)

    # Test 2 for the Recommendation Engine
    def something(self):
        opportunities = {
            "events": [
            {
                "eventID": "1", 
            "eventName": "Campus Lecture Series",
            "eventData": "Environmental Cleanup Day",
            "description": "Assist in organizing and facilitating guest lectures on various topics.",
            "preferences": "Open to all volunteers. No specific skills or age requirements.",
            "tags": [],
            "subject": "Education"
            },
            {
                "eventID": "2",
            "eventName": "Environmental Cleanup Day",
                "eventData": "Environmental Cleanup Day",
            "description": "Join us to clean up the campus and raise environmental awareness.",
            "preferences": "Eco-conscious volunteers preferred. All ages welcome.",
            "tags": [],
            "subject": "Environment"
            },
            {
                "eventID" : "3",
            "eventName": "Art Workshop for Kids",
                "eventData": "Environmental Cleanup Day",
            "description": "Help kids unleash their creativity through arts and crafts.",
            "preferences": "Artistic skills and a background check required.",
            "tags": [],
            "subject": "Youth"
            },
            {
                "eventID" : "4",
            "eventName": "Sports Tournament",
                "eventData": "Environmental Cleanup Day",
            "description": "Volunteer as referees and event organizers for a local sports tournament.",
            "preferences": "Knowledge of the sport and strong communication skills required.",
            "tags": [],
            "subject": "Sports"
            },
            {
                "eventID": "5",
            "eventName": "Charity Run for Cancer",
                "eventData": "Environmental Cleanup Day",
            "description": "Support the charity run to raise funds for cancer research.",
            "preferences": "No specific skills required. All ages welcome.",
            "tags": [],
            "subject": "Health"
            },
            {
                "eventID": "6",
            "eventName": "Book Fair",
                "eventData": "Environmental Cleanup Day",
            "description": "Assist in organizing and managing a book fair with a wide selection of books.",
            "preferences": "Literature enthusiasts and strong organizational skills preferred. No specific age requirement.",
            "tags": [],
            "subject": "Literature"
            },
            {
                "eventID": "7",
            "eventName": "Tech Workshop",
                "eventData": "Environmental Cleanup Day",
            "description": "Help organize a tech workshop for students interested in coding and programming.",
            "preferences": "Tech-savvy individuals and coding experience preferred.",
            "tags": [],
            "subject": "Technology"
            },
            {
                "eventID": "8",
            "eventName": "Senior Citizens' Social",
                "eventData": "Environmental Cleanup Day",
            "description": "Spend time with senior citizens, engage in conversations, and assist with activities.",
            "preferences": "Friendly and patient volunteers. No specific age requirement.",
            "tags": [],
            "subject": "Social"
            },
            {
                "eventID": "9",
            "eventName": "Pet Adoption Fair",
                "eventData": "Environmental Cleanup Day",
            "description": "Support a pet adoption event by assisting with pet care and information booths.",
            "preferences": "Animal lovers and responsible individuals.",
            "tags": [],
            "subject": "Animals"
            },
            {
                "eventID": "10",
            "eventName": "Cultural Diversity Festival",
                "eventData": "Environmental Cleanup Day",
            "description": "Help organize and promote a festival celebrating cultural diversity.",
            "preferences": "Cultural awareness and event planning experience preferred. No specific age requirement.",
            "tags": [],
            "subject": "Culture"
            },
            {
                "eventID": "11",
            "eventName": "Emergency Response Training",
                "eventData": "Environmental Cleanup Day",
            "description": "Assist in organizing emergency response training for the community.",
            "preferences": "First aid or emergency training background preferred",
            "tags": [],
            "subject": "Emergency Services"
            },
            {
                "eventID": "12",
            "eventName": "Gardening Club Meeting",
                "eventData": "Environmental Cleanup Day",
            "description": "Participate in the gardening club's monthly meeting and help with planting and maintenance.",
            "preferences": "Gardening enthusiasts and outdoor lovers. No specific age requirement.",
            "tags": [],
            "subject": "Nature"
            },
            {
                "eventID": "13",
            "eventName": "Habitat for Humanity Build",
                "eventData": "Environmental Cleanup Day",
            "description": "Participate in a home-building project for low-income families.",
            "preferences": "Construction or carpentry skills preferred.",
            "tags": [],
            "subject": "Housing"
            },
            {
                "eventID": "14",
            "eventName": "Chess Tournament",
                "eventData": "Environmental Cleanup Day",
            "description": "Assist in organizing a chess tournament for students and chess enthusiasts.",
            "preferences": "Chess players with knowledge of tournament rules.",
            "tags": [],
            "subject": "Games"
            },
            {
                "eventID": "15",
            "eventName": "Youth Mentorship Program",
                "eventData": "Environmental Cleanup Day",
            "description": "Support a mentorship program for at-risk youth by offering guidance and support.",
            "preferences": "Mentoring experience and background check required.",
            "tags": [],
            "subject": "Youth"
            },
            {
                "eventID": "16",
            "eventName": "Film Screening and Discussion",
                "eventData": "Environmental Cleanup Day",
            "description": "Help organize film screenings and lead discussions on thought-provoking films.",
            "preferences": "Film enthusiasts and strong communication skills. No specific age requirement.",
            "tags": [],
            "subject": "Film"
            },
            {
                "eventID": "17",
            "eventName": "Cooking Workshop",
                "eventData": "Environmental Cleanup Day",
            "description": "Assist in a cooking workshop to teach culinary skills to participants.",
            "preferences": "Culinary experience and passion for cooking",
            "tags": [],
            "subject": "Cooking"
            },
            {
                "eventID": "18",
            "eventName": "Blood Donation Drive",
                "eventData": "Environmental Cleanup Day",
            "description": "Support a blood donation drive by assisting with registration and refreshments.",
            "preferences": "Compassionate individuals. No specific age requirement.",
            "tags": [],
            "subject": "Health"
            },
            {
                "eventID": "19",
            "eventName": "Local Farmers' Market",
                "eventData": "Environmental Cleanup Day",
            "description": "Help run a farmers' market stall and promote locally grown produce.",
            "preferences": "Interest in local agriculture and marketing skills. No specific age requirement.",
            "tags": [],
            "subject": "Agriculture"
            }
            ]
        }

        userFields = {
            "users": [
            {
                "workExp": "James Parker",
                "description": "I'm a teacher with a passion for education. I excel in classroom management and curriculum development. I'm at my best when working with students in a diverse learning environment.",
                "volunteerExp": "I have a strong penchant for creating engaging lesson plans and fostering critical thinking in my students. Outside the classroom, I enjoy reading, traveling, and volunteering for community events.",
                "tags": ['Art', 'Biology', "Children's Programs"],
                "major": "Education"
            }
            ]
        }

        mock_data = {
                     "users" : userFields["users"],
                     "events": opportunities["events"]
                    }
        
        response = self.app.post('/recommendations_endpoint', json=mock_data)
        self.assertEqual(response.status_code, 200)

if __name__ == "__main__":
    unittest.main()
