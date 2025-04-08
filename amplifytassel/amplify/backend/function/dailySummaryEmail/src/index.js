"use strict";
/* Amplify Params - DO NOT EDIT
    API_AMPLIFYTASSEL_GRAPHQLAPIENDPOINTOUTPUT
    API_AMPLIFYTASSEL_GRAPHQLAPIIDOUTPUT
    API_AMPLIFYTASSEL_GRAPHQLAPIKEYOUTPUT
    ENV
    REGION
Amplify Params - DO NOT EDIT */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const axios_1 = __importDefault(require("axios"));
const axios_retry_1 = __importDefault(require("axios-retry"));
const aws_sdk_1 = require("aws-sdk");
aws_sdk_1.config.region = process.env.REGION;
const ses = new aws_sdk_1.SES({ apiVersion: '2010-12-01' });
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
const handler = async (event, context) => {
    // Initialize axios instance with AppSync GraphQL endpoint
    const Axios = axios_1.default.create({
        baseURL: GRAPHQL_ENDPOINT,
        headers: {
            'x-api-key': GRAPHQL_API_KEY,
            'Content-Type': 'application/json'
        }
    });
    (0, axios_retry_1.default)(Axios, { retries: 3 });
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
    // Send an email for each new opportunity
    for (const opp of opportunities) {
        const receiver = 'msuharittest@gmail.com'; // This is the email of whoever's getting notified
        const subject = `New Opportunity Created: ${opp.eventName}`;
        const body = `
      A new opportunity has been created.

      Event Name: ${opp.eventName}
      Description: ${opp.description}
      Start Time: ${opp.startTime}
      Status: ${opp.status}
      Created At: ${opp.createdAt}
      Opportunity ID: ${opp.id}`;
        try {
            await sendEmail(receiver, subject, body);
            console.log(`Email sent for opportunity: ${opp.id}`);
        }
        catch (err) {
            console.error(`Failed to send email for opportunity ${opp.id}:`, err);
        }
    }
    return {
        statusCode: 200,
        body: JSON.stringify('Emails sent for new opportunities'),
    };
    // Old Code
    // return {
    //    statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
    //    body: JSON.stringify('Hello from Lambda!'),
    //};
};
exports.handler = handler;
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
        Source: 'msuharittest@gmail.com' // Whoever sends the notification email
    };
    return await ses.sendEmail(eParams).promise();
}
