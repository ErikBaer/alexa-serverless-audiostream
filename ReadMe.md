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



## Setup

- Install the serverless framework globally:

```
npm i -g serverless
``` 
- Install dependencies:

```
npm install
``` 
- An example configuration can be found at:
 ```
config/default.example.json
```
After revising and / or customizing specific values, please rename the file to: 
 ```
config/default.json
 ```
#### Configure credentials

- Configure Serverless Framework for the provider AWS
- Retrieve the credentials of your Amazon-Developer account
- For the purpose of this example please add those  credentials to the file config/default.json (- ignored by git)
 
###### For detailed information on how to retrieve and configure your credentials, please kindly refer to these sources below: 
https://www.serverless.com/framework/docs/providers/aws/guide/credentials/

https://www.serverless.com/blog/how-to-manage-your-alexa-skills-with-serverless

   



## Create skill
Execute the npm script "create":
```
npm run create  
```

```
"create": "sls alexa auth && sls alexa create --name BaerData --locale de-DE --type custom",
```
##### Sls alexa auth
- Login to your Amazon-Developer account in your Browser (pop-up window)
##### Sls alexa create
- A new Amazon Skill is created via the Skill Management APIs (SMAPI) 
- The given default values can be customized by passing in custom values to the script:
```
npm run create --name YourSkill --locale en-US --type custom
```
   
- After the skill is successfully created, the corresponding Amazon-SKILL-ID is return to the console
- Please copy that Skill-ID and insert it into the config-file (default.json) at the appropriate position 

## Deployment
Execute the npm script "deploy":
```
npm run deploy
```
```
"deploy": "sls deploy && sls alexa build && sls alexa update"
```
##### sls deploy
- the cloudformation stack is build and the lambdas etc. are deployed
##### sls alexa build
- the Skill is build according to configuration
##### sls alexa update
- the skill-manifest is updated 

### Usage

##### Open Alexa
##### Ask Alexa to "...start baer data"
#### Have fun with your favourite radio-stream!