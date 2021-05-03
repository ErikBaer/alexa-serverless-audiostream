# Simple Alexa Skill – Radio Streaming by BaerData

## Description:

Just invoke the Skill and enjoy listening to the stream of your favourite radio-station.

An example for a simple Alexa-skill configured and implemented via the serverless framework, written in node.js and typescript. 
 This solution is partly based on a reference implementation by the Alexa Developer Team, as presented and discussed 
 in the multi-part video-series "Zero to Hero: A comprehensive course to building an Alexa Skill". Please kindly find the source code as well as further information on the reference series and beyond by following the links below:

 https://alexa.design/Z2H1
 
 https://www.serverless.com/
 
 https://www.serverless.com/plugins/serverless-plugin-typescript

In order to enable full development, configuration as well as deployment of the  Alexa-Skill alongside the necessary backend resources directly via the Serverless Framework,
this solution additionally leverages capabilities of the official SDK, realized via the plugin "serverless-alexa-skills": 

https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs

https://www.serverless.com/plugins/serverless-alexa-skills
	


## Prerequisites:
- AWS Account
- Amazon Developer Account
- Node.js



## Setup:

- install the serverless framework globally:
```
npm i -g serverless
``` 
- install dependencies:

```
npm install
``` 
- an example configuration can be found at:
 ```
config/default.example.json
```
- after revising and / or customizing specific values, please rename the file to: 
 ```
config/default.json
 ```
#### Configure credentials

- configure the serverless framework for the provider AWS
- retrieve the credentials for api access to your Amazon-Developer account
- for the purpose of this example please add those credentials to the file config/default.json (- ignored by git)
 
###### For detailed information on how to retrieve and configure the credentials, please kindly refer to these sources below: 
https://www.serverless.com/framework/docs/providers/aws/guide/credentials/

https://www.serverless.com/blog/how-to-manage-your-alexa-skills-with-serverless

   



## Create Skill:
Execute the npm script "create":
```
npm run create  
```

```
{"create": "sls alexa auth && sls alexa create --name BaerData --locale de-DE --type custom"}
```
##### sls alexa auth
- authenticate with Amazon OAuth2
- login to your Amazon-Developer account by browser pop-up
##### sls alexa create
- a new Amazon Skill is created via the Skill Management APIs (SMAPI) 
- the given default values can be customized by passing in custom values to the script:
```
npm run create --name **YourSkill** --locale **xx-XX** --type custom
```
   
- after the skill is successfully created, the corresponding Amazon-SKILL-ID is return to the console
- ##### please copy that Skill-ID and insert it into the config-file (default.json) at the appropriate position 

## Deployment:
Execute the npm script "deploy":
```
npm run deploy
```
```
{"deploy": "sls deploy && sls alexa build && sls alexa update"}
```
##### sls deploy
- the lambda function containing all business logic is compiled, build and then deployed
- a corresponding AWS-Cloudformation stack is released, providing all required resources and permissions for the backend of your skill 
##### sls alexa build
- the respective interaction models for your skill are build and published
##### sls alexa update
- the skill-manifest is updated with further configurations as well as related assets

### Usage:
##### start BaerData
- activate Alexa or go to the Amazon Developer Console
- invoke the Skill by its invocationName
- for this demonstration, just ask Alexa to "start baer data" and ...
##### ... have fun with your favourite radio-stream!