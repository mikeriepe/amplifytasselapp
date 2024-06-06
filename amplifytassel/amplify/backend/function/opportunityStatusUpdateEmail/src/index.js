/* Amplify Params - DO NOT EDIT
	API_AMPLIFYTASSEL_GRAPHQLAPIENDPOINTOUTPUT
	API_AMPLIFYTASSEL_GRAPHQLAPIIDOUTPUT
	API_AMPLIFYTASSEL_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const fetch = require('node-fetch');
const AWS = require('aws-sdk');
AWS.config.region = process.env.REGION;

const ses = new AWS.SES({ apiVersion: '2010-12-01' });

const GRAPHQL_ENDPOINT = process.env.API_AMPLIFYTASSEL_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_AMPLIFYTASSEL_GRAPHQLAPIKEYOUTPUT;
const WEBSITE = 'slugmatch.app';

const profileQuery = /* GraphQL */ `
  query ProfileQuery($profileID: ID!) {
    getProfile(id: $profileID) {
      email
    }
  }
`;

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {

  console.log('event: ' + JSON.stringify(event));

  return await Promise.all(event.Records.map(async (record) => {
    try {
      const newImage = AWS.DynamoDB.Converter.unmarshall(record.dynamodb.NewImage);
      const oldImage = AWS.DynamoDB.Converter.unmarshall(record.dynamodb.OldImage);

      console.log('Old opportunity image: ' + JSON.stringify(oldImage));
      console.log('New opportunity image: ' + JSON.stringify(newImage));

      console.log(`Opportunity: ${newImage.eventName}. Status: ${oldImage.status} -> ${newImage.status}`);

      if (!newImage.status) {
        console.log('Opportunity ' + oldImage.eventName + ' was deleted');
        return;
      }

      // Get email of user who created the opportunity
      const profileQueryVariables = {
        profileID: newImage.profileID
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

      console.log('profileBody: ' + JSON.stringify(profileBody));

      // opportunity email, name, and ID
      const email = profileBody.data.getProfile.email;
      const name = newImage.eventName;
      const id = newImage.id;

      if (!oldImage.status) {
        console.log('Opportunity ' + name + ' was created by user ' + email);
        return await sendEmail(
          email,
          `Your Opportunity ${name} Was Created`,
`Your opportunity ${name} is pending approval from Tassel administrators.

View your opportunity here: ${WEBSITE}/Opportunity/${id}

Have any questions? Contact us at tasselsupport@gmail.com.`
        );
      }

      else if (oldImage.status !== newImage.status) {
        if (newImage.status === 'APPROVED') {
          console.log(`Opportunity ${name} has been approved`);
          return await sendEmail(
            email,
            `Your Opportunity ${name} Has Been Approved`,
`Your opportunity ${name} has been approved.

View your opportunity here: ${WEBSITE}/Opportunity/${id}

Have any questions? Contact us at tasselsupport@gmail.com.`
          );
        }
        if (newImage.status === 'DENIED') {
          console.log(`Opportunity ${name} has been denied`);
          return await sendEmail(
            email,
            `Your Opportunity ${name} Has Been Denied`,
`Your opportunity ${name} has been denied.

View your opportunity here: ${WEBSITE}/Opportunity/${id}

Have any questions? Contact us at tasselsupport@gmail.com.`
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