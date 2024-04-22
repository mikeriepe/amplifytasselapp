const AWS = require('aws-sdk');
AWS.config.region = process.env.AWS_REGION;

const ses = new AWS.SES({ apiVersion: '2010-12-01' });

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event, context) => {
  if (
    event.request.userAttributes.email &&
    event.triggerSource === 'PostConfirmation_ConfirmSignUp'
  ) {
    const firstName = event.request.userAttributes.given_name;
    const lastName = event.request.userAttributes.family_name;
    try {
      return await sendEmail(
        event.request.userAttributes.email,
        'Welcome to Tassel!',
`Welcome to Tassel, ${firstName} ${lastName}!

Your account is pending approval from a Tassel administrator.

Need help? Contact us at tasselsupport@gmail.com.`
      );
    } catch (err) {
      return err;
    }
  }
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
