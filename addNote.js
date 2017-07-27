'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const config = require('./config.js');

const sns = new AWS.SNS();

module.exports.addNote = (event, context, callback) => {
  const data = JSON.parse(event.body);
  if (typeof data.note !== 'string') {
    console.error('Validation Failed');
    callback(new Error('Couldn\'t add the note.'));
    return;
  }

  const params = {
    Message: data.note,
    TopicArn: `arn:aws:sns:us-west-2:${config.awsAccountId}:analyzeNote`,
  };

  sns.publish(params, (error) => {
    if (error) {
      console.error(error);
      callback(new Error('Couldn\'t add the note due an internal error. Please try again later.'));
    }
    // create a resonse
    const response = {
      statusCode: 200,
      body: JSON.stringify({ message: 'Successfully added the note.' }),
    };
    callback(null, response);
  });
};