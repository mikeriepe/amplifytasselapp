/* Amplify Params - DO NOT EDIT
	API_AMPLIFYTASSEL_GRAPHQLAPIENDPOINTOUTPUT
	API_AMPLIFYTASSEL_GRAPHQLAPIIDOUTPUT
	API_AMPLIFYTASSEL_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const fetch = require('node-fetch');
const AWS = require("aws-sdk");
AWS.config.region = process.env.REGION;

const ses = new AWS.SES({ apiVersion: '2010-12-01' });

const GRAPHQL_ENDPOINT = process.env.API_AMPLIFYTASSEL_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_AMPLIFYTASSEL_GRAPHQLAPIKEYOUTPUT;

const requestQuery = /* GraphQL */ `
  query RequestQuery($opportunityID: ID!, $roleID: ID!, $profileID: ID!) {
    getOpportunity(id: $opportunityID) {
      eventName
      profileID
    }
    getProfile(id: $profileID) {
      email
    }
    getRole(id: $roleID) {
      name
    }
  }
`;

const profileQuery = /* GraphQL */ `
  query ProfileQuery($profileID: ID!) {
    getProfile(id: $profileID) {
      email
    }
  }
`;

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 * @link https://docs.amplify.aws/javascript/build-a-backend/functions/graphql-from-lambda/
 * @description GraphQL queries reference: AWS AppSync -> amplifytassel-dev -> Queries
 */
exports.handler = async (event) => {

  // console.log(JSON.stringify(event));
  
  return await Promise.all(event.Records.map(async (record) => {
    try {
      const newImage = AWS.DynamoDB.Converter.unmarshall(record.dynamodb.NewImage);
      const oldImage = AWS.DynamoDB.Converter.unmarshall(record.dynamodb.OldImage);
      // console.log(`Old image: ${JSON.stringify(oldImage)}`);
      // console.log(`New image: ${JSON.stringify(newImage)}`);

      /*
        Sample Image
        {
          "_lastChangedAt": 1713210753143,
          "responseTime": "2024-04-15T19:52:33.116Z",
          "roleID": "f53543a5-2f75-4b46-9e7d-1f1a99237d2b",
          "__typename": "Request",
          "requestMessage": "This is Danielchandg applying to Car Crash Test on 4/15/24 at 12:52 pm.",
          "requestTime": "2024-04-15T19:52:33.116Z",
          "createdAt": "2024-04-15T19:52:33.108Z",
          "opportunityID": "c03749bb-24ec-42b8-8561-a5a5caf62e9d",
          "profileID": "b7019e3e-c72a-4562-8903-f6536a38a0a9",
          "id": "10fcb39b-7072-463f-bd57-6a5c54b2a25f",
          "responseMessage": " ",
          "_version": 1,
          "status": "PENDING",
          "updatedAt": "2024-04-15T19:52:33.108Z"
        }
      */

      // Get opportunity name, email of user who sent request, and role name
      const { roleID, opportunityID, profileID } = newImage;

      const requestQueryVariables = {
        opportunityID,
        roleID,
        profileID
      };

      // console.log('Request query variables: ' + JSON.stringify(requestQueryVariables));

      const requestOptions = {
        method: 'POST',
        headers: {
          'x-api-key': GRAPHQL_API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: requestQuery, variables: requestQueryVariables })
      };

      const requestResponse = await fetch(GRAPHQL_ENDPOINT, requestOptions);
      const requestBody = await requestResponse.json();
      /*
        Sample body
        {
          "data": {
            "getOpportunity": {
              "eventName": "Car Crash Test",
              "profileID": "c01acf28-952d-4489-9a77-fc0a3aa41a29"
            },
            "getProfile": {
              "email": "kurira@socam.me"
            },
            "getRole": {
              "name": "Crash Test Dummy"
            }
          }
        }
      */

      console.log('requestBody: ' + JSON.stringify(requestBody));

      const opportunityName = requestBody.data.getOpportunity.eventName;
      const profileEmail = requestBody.data.getProfile.email;
      const roleName = requestBody.data.getRole.name;

      // Get email of user who created the opportunity
      const profileQueryVariables = {
        profileID: requestBody.data.getOpportunity.profileID
      }
      const profileOptions = {
        method: 'POST',
        headers: {
          'x-api-key': GRAPHQL_API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: profileQuery, variables: profileQueryVariables })
      };
      const profileResponse = await fetch(GRAPHQL_ENDPOINT, profileOptions);
      const profileBody = await profileResponse.json();
      const creatorEmail = profileBody.data.getProfile.email;

      if (!oldImage.status && newImage.status) {
        // New opportunity request was created.
        // Send email to the opportunity author.
        console.log('Request: User ' + profileEmail + ' requested role ' + roleName + ' for opportunity ' + opportunityName);
        return await sendEmail(
          creatorEmail,
          'A New User Has Requested To Join ' + opportunityName,
`User ${profileEmail} has requested the role ${roleName} for an opportunity you created: ${opportunityName}.

View the opportunity here: <link>`
        );
      }
      else if (oldImage.status && oldImage.status !== newImage.status) {
        if (newImage.status === 'APPROVED') {
          // Notify user they have been approved.
          console.log('User ' + profileEmail + ' has been approved for the role of ' + roleName + ' for the opportunity ' + opportunityName);
          return await sendEmail(
            profileEmail,
            'You Have Been Approved For ' + opportunityName,
`Congrats! Your application for the role ${roleName} for the opportunity ${opportunityName} has been accepted.

View the opportunity here: <link>

Have any questions? Email the organizer - ${creatorEmail}`
          );
        }
        if (newImage.status === 'REJECTED') {
          // Notify user they have been rejected.
          console.log('User ' + profileEmail + ' has been rejected for the role of ' + roleName + ' for the opportunity ' + opportunityName);
          return await sendEmail(
            profileEmail,
            'You Have Been Rejected For ' + opportunityName,
`Your application for the role of ${roleName} for the opportunity ${opportunityName} has been rejected.

Have any questions? Email the organizer - ${creatorEmail}`
          );
        }
      }
    }
    catch (error) {
      console.log('ERROR: ' + error);
    }
  }));
};

async function sendEmail(to, subject, body) {
  var eParams = {
    Destination: {
      ToAddresses: [to]
    },
    Message: {
      Body: {
        Text: {
          Data: body
        }
      },
      Subject: {
        Data: subject
      }
    },
    Source: 'dawichan@ucsc.edu'
  };
  return await ses.sendEmail(eParams).promise();
}