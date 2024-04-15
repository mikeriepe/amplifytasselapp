/* Amplify Params - DO NOT EDIT
	API_AMPLIFYTASSEL_GRAPHQLAPIENDPOINTOUTPUT
	API_AMPLIFYTASSEL_GRAPHQLAPIIDOUTPUT
	API_AMPLIFYTASSEL_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const fetch = require('node-fetch');
const AWS = require("aws-sdk");

const GRAPHQL_ENDPOINT = process.env.API_AMPLIFYTASSEL_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_AMPLIFYTASSEL_GRAPHQLAPIKEYOUTPUT;

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 * @link https://docs.amplify.aws/javascript/build-a-backend/functions/graphql-from-lambda/
 */
exports.handler = async (event) => {
  
  return await Promise.all(event.Records.map(async (record) => {
    try {
      const newImage = AWS.DynamoDB.Converter.unmarshall(record.dynamodb.NewImage);
      const oldImage = AWS.DynamoDB.Converter.unmarshall(record.dynamodb.OldImage);
      console.log(`Old image: ${JSON.stringify(oldImage)}`);
      console.log(`New image: ${JSON.stringify(newImage)}`);
      
      const query = /* GraphQL */ `
        query MyQuery {
          getProfile(id: "9bafb01d-25d4-42d9-889e-8256d4051dc2") {
            email
          }
          getOpportunity(id: "748f5b4f-e354-4cf0-ac4d-af7a76c1bdae") {
            eventName
            profileID
          }
          getOpportunityProfile(id: "c01acf28-952d-4489-9a77-fc0a3aa41a29") {
            opportunityId
          }
        }
      `;

      const options = {
        method: 'POST',
        headers: {
          'x-api-key': GRAPHQL_API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
      };

      let statusCode = 200;
      let body;
      let response;

      try {
        response = await fetch(GRAPHQL_ENDPOINT, options);
        body = await response.json();
        if (body.errors) statusCode = 400;
      } catch (error) {
        statusCode = 400;
        body = {
          errors: [
            {
              status: response.status,
              message: error.message,
              stack: error.stack
            }
          ]
        };
      }
      console.log('statusCode: ' + statusCode);
      console.log('body: ' + JSON.stringify(body));
      
    }
    catch (error) {
      console.log('ERROR: ' + error);
    }
  }));

}
