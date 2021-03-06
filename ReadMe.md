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
config/default.json
 ```
#### Configure credentials

- configure the serverless framework for the provider AWS
- retrieve the credentials for api access to your Amazon-Developer account
- please enter those credentials into the file .env.example and rename it to .env
- the variables will be injected into the process at runtime and are not subject to any version control (.gitignore)
 
###### For detailed information on how to retrieve and configure the credentials, please kindly refer to these sources below: 
https://www.serverless.com/framework/docs/providers/aws/guide/credentials/

https://www.serverless.com/blog/how-to-manage-your-alexa-skills-with-serverless

## Skill creation:
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
- ##### please copy that Skill-ID and insert it into the .env file at the appropriate position 

## Deployment:
Execute the npm script "deploy":
```
npm run deploy
```
```
"deploy": " {npm run test && npm run lint && sls deploy && sls alexa build && sls alexa update"}
```
##### sls deploy
- the lambda function containing all business logic is compiled, build and then deployed to AWS
- a corresponding AWS-Cloudformation stack is released, providing all required resources and permissions for the backend of your skill 
##### sls alexa build
- the respective interaction models for your skill are build and published via the Alexa Developer Console
##### sls alexa update
- the underlying skill-manifest is updated with further configurations as well as related assets

### Usage:
##### start BaerData
- activate the skill by going to the Amazon Developer Console
- access the "Test" tab and enable testing for the environment "development"
- then for this demonstration, open up Alexa and tell her to just "start baer data" and ...
##### ... have fun with your favourite radio-stream!

### Testing:

##### npm run test

- integration tests are implemented via the frameworks mocha & chai as well as the alexa-skill-testing-framework
- the plugin serverless-dynamodb-local ist used to enable testing of attribute persistence

```
"test": "npm run db-cleanup && sls dynamodb start & sleep 5 
         && mocha --require node_modules/ts-node/register/index.js test/*.spec.ts 
         && npm run db-cleanup"
```
- the script db-cleanup deals with a shortcoming of dynamodb-local, namely that the DB-process does not terminate whith the plugin , also it can not be terminated programmatically
- an effective workaround ist presented in the script below, identifying the specific process by namespace and killing it individually
```
"db-cleanup": "kill `ps -ax | grep Dynamo | grep -v grep | awk '{print $1}'` >/dev/null 2>&1 &"
```
https://github.com/BrianMacIntosh/alexa-skill-test-framework

https://www.serverless.com/plugins/serverless-dynamodb-local
### Linting / Formatting:

- linting ist done via eslint / typescript-eslint, extending on a reference configuration published by air-bnb
- automatic code-formatting is enabled via the eslint integration of prettier

```
npm run lint
npm run format
```
```
"lint": "eslint -c .eslintrc.js 'src/**/*{.ts,.tsx}' "
"format": "prettier-eslint --eslint-config-path ./.eslintrc.js --write 'src/**/*{.ts,.tsx}'"
```
 
 https://eslint.org/
 
 https://prettier.io/
 
 https://github.com/typescript-eslint/typescript-eslint
 
 
 ### Logging:
 
 - each incoming and outgoing interaction with the skill is fully logged (including "RequestErrors")
 - the related state-model of the specific session is also logged on each interaction (with correlating ID)
 - the logger of choice: pino with pino-pretty for local development
 
 https://github.com/pinojs/pino
 
 ### Continuous deployment
 
 - A CI/CD pipeline is implemented using the devops features of Gitlab
 - first a docker base-image is generated containing underlying dependencies
 - then a couple of pre-check routines are followed, including running npm lint
 - after that the test suite runs against a mock-database
 - at last the command sls deploy is executed and the code is automatically deployed to production
 
  ![gitlab-pipeline](assets/pipeline.png)
 
 For your own implementation, please enter the variables from your local .env file into the related gitlab environment, alongside your dedicated AWS-credentials!
 
https://docs.gitlab.com/ee/ci/variables/
 
 
