# textanalysissnspost
text analysis using sentiment
Pre-requisites

   1 . https://serverless.com/framework/docs/providers/aws/guide/installation/
   2 . git clone https://github.com/prabhatpankaj/textanalysissnspost.git
   3 . cd textanalysissnspost 
   4 . npm install --save aws-sdk sentiment
   5 . serverless deploy
   
   

This example demonstrates how to setup a simple data processing pipeline. The service exposes one HTTP endpoint that allows you to add a text note. This HTTP endpoint returns instantly to provide a good user experience while the actual analysis is deferred. Only messages above a certain sentiment level are actually saved.

Instead of invoking another Lambda function directly it's considered best practice to store the note as a message in a SNS queue. The queue has certain benefits compared to invoking the analyzeNote function directly. The queue supports retries in case the analyzeNote function fails as well as back-off to avoid too many concurrent invocations.


Usage

In order to add a note run

curl -X POST https://XXXXXXXXX.execute-api.us-west-2.amazonaws.com/dev/notes --data '{ "note": "This is such a great Day" }'

You should see the following output

{"message":"Successfully added the note."}%

curl -X POST https://XXXXXXXXX.execute-api.us-west-2.amazonaws.com/dev/notes --data '{ "note": "I will kill you " }'


To verify that the note has been processed run

serverless logs --function analyzeNote

This command will show you the logged output and looks liked this

START RequestId: f51f3991-726f-11e7-a5a0-8d3ced4579e8 Version: $LATEST
2017-07-27 02:04:44.295 (+00:00)        f51f3991-726f-11e7-a5a0-8d3ced4579e8    Positive note - will be published: This is such a great Day
END RequestId: f51f3991-726f-11e7-a5a0-8d3ced4579e8
REPORT RequestId: f51f3991-726f-11e7-a5a0-8d3ced4579e8  Duration: 2.85 ms       Billed Duration: 100 ms         Memory Size: 1024 MB    Max Memory Used: 20 MB

START RequestId: 23a2e10e-7270-11e7-b6c5-f753c54661d2 Version: $LATEST
2017-07-27 02:06:01.857 (+00:00)        23a2e10e-7270-11e7-b6c5-f753c54661d2    Negative note - won't be published: I will kill you
END RequestId: 23a2e10e-7270-11e7-b6c5-f753c54661d2
REPORT RequestId: 23a2e10e-7270-11e7-b6c5-f753c54661d2  Duration: 0.67 ms       Billed Duration: 100 ms         Memory Size: 1024 MB    Max Memory Used: 24 MB
