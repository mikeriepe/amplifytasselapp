/* Amplify Params - DO NOT EDIT
	API_AMPLIFYTASSEL_GRAPHQLAPIENDPOINTOUTPUT
	API_AMPLIFYTASSEL_GRAPHQLAPIIDOUTPUT
	API_AMPLIFYTASSEL_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import axios from 'axios';
import axiosRetry from 'axios-retry';
import { Handler, S3Event, Context } from 'aws-lambda';
import { config, SES } from 'aws-sdk';
config.region = process.env.REGION;

const ses = new SES({ apiVersion: '2010-12-01' });

const GRAPHQL_ENDPOINT = process.env.API_AMPLIFYTASSEL_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_AMPLIFYTASSEL_GRAPHQLAPIKEYOUTPUT;

// Get profiles + opportunities created after a certain date
const query = /* GraphQL */ `
query Query($date: String!) {
  listProfiles(filter: {createdAt: {ge: $date}}) {
    items {
      createdAt
      email
      status
      id
      firstName
      lastName
    }
  }
  listOpportunities(filter: {createdAt: {ge: $date}}) {
    items {
      status
      id
      createdAt
      eventName
      startTime
      description
    }
  }
}
`;

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 * 
 * @description
 * This function uses SES, EventBridge Scheduler (for recurring invocation), and AppSync (GraphQL on DynamoDB)
 * Always run 'tsc' or 'amplify mock function dailySummaryEmail' before amplify push. (Transpile this TS to JS)
 * 
 * @links
 * Using ES Modules and top-level await in Lambda
 * https://aws.amazon.com/blogs/compute/using-node-js-es-modules-and-top-level-await-in-aws-lambda/
 * 
 * Eventbridge Scheduler to invoke on timezone-specific recurring schedule
 * https://docs.aws.amazon.com/lambda/latest/dg/with-eventbridge-scheduler.html
 * 
 * TypeScript setup
 * https://github.com/aws-amplify/amplify-cli/issues/10432#issuecomment-1239878449
 * 
 * Types for Lambda handler
 * https://docs.aws.amazon.com/lambda/latest/dg/typescript-handler.html#event-types
 * 
 * Context properties (optional)
 * https://docs.aws.amazon.com/lambda/latest/dg/typescript-context.html
 */
export const handler: Handler = async (event: S3Event, context: Context) => {

  // Initialize axios instance with AppSync GraphQL endpoint
  const Axios = axios.create({
    baseURL: GRAPHQL_ENDPOINT,
    headers: {
      'x-api-key': GRAPHQL_API_KEY,
      'Content-Type': 'application/json'
    }
  });
  axiosRetry(Axios, { retries: 3 });
  
  // Get date of 24 hours ago
  let date = new Date();
  date.setDate(date.getDate() - 1);
  date.setHours(date.getHours(), 0, 0, 0);

  console.log('Date:', date.toISOString());

  const queryBody = {
    query,
    variables: { date: date.toISOString() }
  };
  const response = await Axios.post('', queryBody);
  const profiles = response.data.data.listProfiles.items;
  const opportunities = response.data.data.listOpportunities.items;
  console.log('Profiles created today:', JSON.stringify(profiles));
  console.log('Opportunities created today:', JSON.stringify(opportunities));

  return {
      statusCode: 200,
  //  Uncomment below to enable CORS requests
  //  headers: {
  //      "Access-Control-Allow-Origin": "*",
  //      "Access-Control-Allow-Headers": "*"
  //  },
      body: JSON.stringify('Hello from Lambda!'),
  };
}

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