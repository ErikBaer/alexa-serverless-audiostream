import * as Alexa from 'ask-sdk';
import { DynamoDbPersistenceAdapter } from 'ask-sdk-dynamodb-persistence-adapter'
import { PersistenceAdapter} from 'ask-sdk-core';

import {LoggingRequestInterceptor,
            LoggingResponseInterceptor,
            LoadAttributesRequestInterceptor,
            SaveAttributesResponseInterceptor} from './lambda/interceptors'

import {LaunchRequestHandler, CancelAndStopIntentHandler, HelloWorldIntentHandler, SessionEndedRequestHandler, RequestErrorHandler} from './lambda/request-handlers'

const dynamoDbPersistenceAdapter : PersistenceAdapter = new DynamoDbPersistenceAdapter({ tableName : 'usersTable' });

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler)
    .addErrorHandlers(
        RequestErrorHandler)
    .addRequestInterceptors(
        LoadAttributesRequestInterceptor,
        LoggingRequestInterceptor)
    .addResponseInterceptors(
        LoggingResponseInterceptor,
        SaveAttributesResponseInterceptor)
    .withPersistenceAdapter(
         dynamoDbPersistenceAdapter)
    .lambda();


    //TODO: add uris to  publishingInformation.locales.de-DE.largeIconUri etc. in yml
    //TODO: Add image and phrase to skill invocation
    //TODO: Can I have custom intent / skill without helloWorld? Check example / best practice. What intent could i customize?
    //TODO: npm config
    //TODO: wright short deploy script which pipes the skill id to env?! maybe; probably yes. npm run etc.

    //TODO: Revise audio files (find nice jingles??)
    //TODO: Maybe move IAM to function
    //TODO: Maybe remove logging interceptors to clean things up (unrequired)

    //TODO: Write Docs /   howToRun / whats used / functionality / example usage? Reconsider what you have done, right it down anyway to reproduce quality result!

