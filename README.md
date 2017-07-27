# textanalysissnspost
text analysis using sentiment

Data processing

This example demonstrates how to setup a simple data processing pipeline. The service exposes one HTTP endpoint that allows you to add a text note. This HTTP endpoint returns instantly to provide a good user experience while the actual analysis is deferred. Only messages above a certain sentiment level are actually saved.

Instead of invoking another Lambda function directly it's considered best practice to store the note as a message in a SNS queue. The queue has certain benefits compared to invoking the analyzeNote function directly. The queue supports retries in case the analyzeNote function fails as well as back-off to avoid too many concurrent invocations.


Usage

In order to add a note run

curl -X POST https://XXXXXXXXX.execute-api.us-west-2.amazonaws.com/dev/notes --data '{ "note": "This is such a great Day" }'

You should see the following output

{"message":"Successfully added the note."}%


To verify that the note has been processed run

serverless logs --function analyzeNote

This command will show you the logged output and looks liked this

START RequestId: 75a970ba-ab54-11e6-809d-435833490828 Version: $LATEST
2016-11-15 17:56:32.497 (+01:00)	75a970ba-ab54-11e6-809d-435833490828	Positive note - will be published: This is such a great Day
END RequestId: 75a970ba-ab54-11e6-809d-435833490828
REPORT RequestId: 75a970ba-ab54-11e6-809d-435833490828	Duration: 3.45 ms	Billed Duration: 100 ms 	Memory Size: 1024 MB	Max Memory Used: 15 MB
