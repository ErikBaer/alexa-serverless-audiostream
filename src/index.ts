import * as Alexa from 'ask-sdk';
import { DynamoDbPersistenceAdapter } from 'ask-sdk-dynamodb-persistence-adapter'
import { PersistenceAdapter} from 'ask-sdk-core';

import {LoggingRequestInterceptor,
            LoggingResponseInterceptor,
            LoadAttributesRequestInterceptor,
            SaveAttributesResponseInterceptor} from './lambda/interceptors'

import {LaunchRequestHandler, CancelAndStopIntentHandler, HelloWorldIntentHandler, SessionEndedRequestHandler, RequestErrorHandler} from './lambda/request-handlers'

const tableName = process.env.tableName!
const dynamoDbPersistenceAdapter : PersistenceAdapter = new DynamoDbPersistenceAdapter({tableName});

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        CancelAndStopIntentHandler,
        HelloWorldIntentHandler,
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



    //TODO: Revise audio files (find nice jingles??*Maybe just new first sound!)

    //TODO: maybe add invocation to default.config; can you insert into json ? Or maybe put it back into sls.yml ? OR maybe leave as is ..
    //TODO: Write Docs /   howToRun / whats used / functionality / example usage? Reconsider what you have done, write it down anyway to reproduce quality result!
    //TODO: create default.example.json --> reassure structure

