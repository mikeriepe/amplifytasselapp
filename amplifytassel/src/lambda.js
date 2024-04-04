/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk');
AWS.config.region = process.env.AWS_REGION;

const ses = new AWS.SES({ apiVersion: '2010-12-01' });

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {

  try {
    return await sendEmail(
      'danielchandg@gmail.com',
      'accountStatusUpdate Success',
      `EVENT: ${JSON.stringify(event)}`
    );
  }
  catch (error) {
    return await sendEmail(
      'danielchandg@gmail.com',
      'accountStatusUpdate Error',
      `ERROR: ${error.message}`
    );
  }

  console.log(`EVENT: ${JSON.stringify(event)}`);
  for (const record of event.Records) {
    console.log(record.eventID);
    console.log(record.eventName);
    console.log('DynamoDB Record: %j', record.dynamodb);
  }
  return Promise.resolve('Successfully processed DynamoDB record');
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