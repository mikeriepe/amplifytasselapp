const AWS = require('aws-sdk');
AWS.config.region = process.env.AWS_REGION;

const ses = new AWS.SES({ apiVersion: '2010-12-01' });


/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 * References:
 * - https://docs.amplify.aws/javascript/tools/cli/usage/lambda-triggers/#dynamodb-lambda-triggers
 */
exports.handler = async (event) => {

  return await Promise.all(event.Records.map(async (record) => {
    try {
      const newImage = AWS.DynamoDB.Converter.unmarshall(record.dynamodb.NewImage);
      const oldImage = AWS.DynamoDB.Converter.unmarshall(record.dynamodb.OldImage);
      console.log(`Email: ${newImage.email}. Status: ${oldImage.status} -> ${newImage.status}`);
      if (oldImage.status && oldImage.status !== newImage.status) {
        if (newImage.status === 'APPROVED') {
          console.log(`User ${newImage.email} has been approved`);
          return await sendEmail(
            newImage.email,
            'Your Account Has Been Approved',
`Your Tassel account has been approved.

View your profile here: tassel.com/myprofile

Have any questions? Contact us at tasselsupport@gmail.com.`
          );
        }
        if (newImage.status === 'DENIED') {
          console.log(`User ${newImage.email} has been denied`);
          return await sendEmail(
            newImage.email,
            'Your Account Has Been Denied',
`Your Tassel account has been denied.

View your profile here: tassel.com/myprofile

Have any questions? Contact us at tasselsupport@gmail.com.`
          );
        }
        if (newImage.status === 'ADMIN') {
          console.log(`User ${newImage.email} was promoted to admin`);
          return await sendEmail(
            newImage.email,
            'You Have Been Promoted To Admin',
`Your Tassel account has been promoted to Admin.

View your profile here: tassel.com/myprofile

Have any questions? Contact us at tasselsupport@gmail.com.`
          );
        }
      }
    }
    catch (error) {
      console.log('ERROR: ' + error);
    }
  }));

  /* 
    Sample Image
    {
      "lastName":"dummy50",
      "_lastChangedAt":1712213956901,
      "__typename":"Profile",
      "volunteerExperience":[],
      "active":true,
      "isAdmin":false,
      "experience":[],
      "createdAt":"2024-03-12T19:14:04.834Z",
      "firstName":"test",
      "graduationYear":"2024",
      "id":"335243ca-a453-4157-9686-46164789eb63",
      "isApproved":false,
      "_version":5,
      "email":"Danielchandg+50@gmail.com",
      "status":"PENDING",
      "updatedAt":"2024-04-04T06:59:16.858Z"
    }
  */
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