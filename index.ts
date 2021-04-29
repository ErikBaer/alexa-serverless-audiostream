import * as Alexa from 'ask-sdk';
import { DynamoDbPersistenceAdapter } from 'ask-sdk-dynamodb-persistence-adapter'
import { PersistenceAdapter} from 'ask-sdk-core';

import {LoggingRequestInterceptor,
            LoggingResponseInterceptor,
            LoadAttributesRequestInterceptor,
            SaveAttributesResponseInterceptor} from './lambda/interceptors'

import {LaunchRequestHandler, HelloWorldIntentHandler, HelpIntentHandler, CancelAndStopIntentHandler,SessionEndedRequestHandler, RequestErrorHandler} from './lambda/request-handlers'

const dynamoDbPersistenceAdapter : PersistenceAdapter = new DynamoDbPersistenceAdapter({ tableName : 'usersTable' });

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
    )
    .addErrorHandlers(
        RequestErrorHandler,
    )
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

    //TODO: Revise audio files (find nice jingles??)
    //TODO: Maybe move IAM to function
    //TODO: Write Docs /   howToRun / whats used / functionality / example usage? Reconsider what you have done, right it down anyway to reproduce quality result!

