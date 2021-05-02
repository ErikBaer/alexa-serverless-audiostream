# Simple Alexa Skill – Radio Streaming by BaerData

## Description:

An example for a simple Alexa-skill bl. Written in typescript. containing .. All done via serverless framework, from creation via configuration and deployment. 
The implemented Plugin is:
	- serverless-alexa-skills 
	link
	
https://www.serverless.com/

https://www.serverless.com/plugins/serverless-alexa-skills

## Prerequisites:
- AWS Account
- Amazon Developer Account
- node.js vx.xx



## Setup

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

- configure Serverless Framework for the provider AWS
- retrieve the credentials for api access to your Amazon-Developer account
- for the purpose of this example please add those credentials to the file config/default.json (- ignored by git)
 
###### For detailed information on how to retrieve and configure the credentials, please kindly refer to these sources below: 
https://www.serverless.com/framework/docs/providers/aws/guide/credentials/

https://www.serverless.com/blog/how-to-manage-your-alexa-skills-with-serverless

   



## Create skill
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
npm run create --name YourSkill --locale xx-XX --type custom
```
   
- after the skill is successfully created, the corresponding Amazon-SKILL-ID is return to the console
- ##### please copy that Skill-ID and insert it into the config-file (default.json) at the appropriate position 

## Deployment
Execute the npm script "deploy":
```
npm run deploy
```
```
{"deploy": "sls deploy && sls alexa build && sls alexa update"}
```
##### sls deploy
- the lambda function containing all business logic is compiled, build and then deployed
- a corresponding cloudformation-stack containing all required resources for the backend of your skill is released
##### sls alexa build
- the interaction models for your Skill are build 
##### sls alexa update
- the skill-manifest is updated with general configurations & further assets

### Usage
##### start BaerData
- activate Alexa or go to the Amazon Developer Console
- invoke the Skill by its invocationName
- for this demonstration, just ask Alexa to "start baer data" and ...
##### ... Have fun with your favourite radio-stream!