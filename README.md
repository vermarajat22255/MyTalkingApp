# MyTalkingApp
___________________________________________________________________________________________________
Demonstrate the use of AWS Polly, Lambda functions, Server-less web application 

Concepts used - Angular, Node JS, Gate way API, Lambda function, Polly service, Buckets, IAM
___________________________________________________________________________________________________


An awesome web application that takes the input-text from the user and convert it into a mp3, which can be later saved upon request

-> User enters text at front end.
-> API call at AWS cloud triggers lambda function
-> Lambda function performs following tasks
	- use polly service to convert text to speech
	- save that mp3 to one of the bucket specified
	- returns the newly created file to client
	 

Setup Guide:

Must have node package manager installed on your device.

Run "npm install" to install all the dependencies
Run "npm start" to start the application
Need to setup angular in "Front" folder for front end as well
Goto "localhost:4200/" to start the application


Thanks for visiting my page :)
