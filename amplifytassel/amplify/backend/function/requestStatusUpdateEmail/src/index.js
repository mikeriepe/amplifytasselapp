/* Amplify Params - DO NOT EDIT
	API_AMPLIFYTASSEL_GRAPHQLAPIENDPOINTOUTPUT
	API_AMPLIFYTASSEL_GRAPHQLAPIIDOUTPUT
	API_AMPLIFYTASSEL_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const GRAPHQL_ENDPOINT = process.env.API_AMPLIFYTASSEL_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_AMPLIFYTASSEL_GRAPHQLAPIKEYOUTPUT;

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 * References:
 * - https://youtu.be/NnHg73TOzBM?si=sM8YdigyXYxWyrkB
 */
exports.handler = event => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  for (const record of event.Records) {
    console.log(record.eventID);
    console.log(record.eventName);
    console.log('DynamoDB Record: %j', record.dynamodb);
  }
  return Promise.resolve('Successfully processed DynamoDB record');
};
