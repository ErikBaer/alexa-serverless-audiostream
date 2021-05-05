import * as Alexa from 'ask-sdk';
import * as AWS from 'aws-sdk';
import { DynamoDbPersistenceAdapter } from 'ask-sdk-dynamodb-persistence-adapter';
import { PersistenceAdapter } from 'ask-sdk-core';

import { LoggingRequestInterceptor, LoggingResponseInterceptor, LoadAttributesRequestInterceptor, SaveAttributesResponseInterceptor } from './interceptors';
import { LaunchRequestHandler, CancelAndStopIntentHandler, ResumeIntentHandler, HelloWorldIntentHandler, SessionEndedRequestHandler, RequestErrorHandler } from './request-handlers';

const tableName = process.env.tableName! || 'testTable' ;
const dbParams = (process.env.NODE_ENV !== 'test') ? {} : {region: 'localhost', endpoint: 'http://localhost:8000'};

const   dynamoDbPersistenceAdapter: PersistenceAdapter = new DynamoDbPersistenceAdapter({tableName, createTable: false, dynamoDBClient: new AWS.DynamoDB(dbParams)});

  exports.handler = Alexa.SkillBuilders.custom()
                .addRequestHandlers(
        LaunchRequestHandler,
        CancelAndStopIntentHandler,
        ResumeIntentHandler,
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
