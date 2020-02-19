let AWS = require("aws-sdk");
let polly = new AWS.Polly();
let s3 = new AWS.S3();

module.exports.speak = (event, context, callback) => {
    let data = JSON.parse(event.body);
    const pollyParams = {
        OutputFormat: "mp3",
        Text: data.text,
        VoiceId: data.voice
    };
    console.log("I got the params");
    console.log(pollyParams);
    // 1. Getting the audio stream for the text that user entered
    polly.synthesizeSpeech(pollyParams)
        .on("success", function(response) {
            let data = response.data;
            let audioStream = data.AudioStream;
            let key = 1;
            let s3BucketName = 'bucketforspeakingapp';

            // 2. Saving the audio stream to S3
            let params = {
                Bucket: s3BucketName,
                Key: key + '.mp3',
                Body: audioStream
            };
            s3.putObject(params)
                .on("success", function(response) {
                    console.log("S3 Put Success!");
                })
                .on("complete", function() {
                    console.log("S3 Put Complete!");
                    let s3params = {
                        Bucket: s3BucketName,
                        Key: key + '.mp3',
                    };

                    // 3. Getting a signed URL for the saved mp3 file 
                    let url = s3.getSignedUrl("getObject", s3params);

                    // Sending the result back to the user
                    let result = {
                        bucket: s3BucketName,
                        key: key + '.mp3',
                        url: url
                    };
                    callback(null, {
                        statusCode: 200,
                        headers: {
                            "Access-Control-Allow-Origin": "*"
                        },
                        body: JSON.stringify(result)
                    });
                })
                .on("error", function(response) {
                    console.log(response);
                })
                .send();
        })
        .on("error", function(err) {
            callback(null, {
                statusCode: 500,
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify(err)
            });
        })
        .send();
};