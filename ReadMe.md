# Simple Alexa Skill – Radio Streaming

## Description:

A simple skill bl. Written in typescript. All done via serverless framework, from creation via configuration and deployment. 
The implemented Plugin is:
	- serverless-alexa-skills 
	link

## Prerequisites:
- AWS Account
- Alexa Developer Account
- Node.js

## Setup:

#### Installation / Configuration

An example configuration can be found at:
 ```
config/default.example.json
```
After revising the values, please rename it to:
 ```
config/default.json
 ```
This will also add the file to .gitignore. 


#####Install the serverless framework globally:

```
npm i -g serverless
``` 
#####Install dependencies:

```
npm install
``` 

#### Configure credentials

- Configure the AWS credentials for Serverless Framework
- Retrieve your Alexa-Developer credentials 
- For simplicity add those credentials to the file config/default.json, together with your AWS_ACCOUNT_ID
- The values will be injected into the environment at runtime and are not part of any version-control! 
###### For detailed information on how to retrieve and configure your credentials, please kindly refer to these sources below: 
https://www.serverless.com/framework/docs/providers/aws/guide/credentials/

https://www.serverless.com/blog/how-to-manage-your-alexa-skills-with-serverless

   



#### Create skill
```
npm run create  
```
- login to your developer-account via browser pop-up
- after the skill is successfully created, copy the SKILLId from the output in  the console

## Deployment:
run 
```
npm run deploy
```
- the cloudformation stack is build and the lambdas etc. are deployed
- the Skill is build according to configuration
- the skill-manifest is updated 