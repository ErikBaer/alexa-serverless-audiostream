/* eslint-disable @typescript-eslint/no-var-requires */
import * as Alexa from 'ask-sdk';
import * as AWS from 'aws-sdk';
import { DynamoDbPersistenceAdapter } from 'ask-sdk-dynamodb-persistence-adapter';
import { PersistenceAdapter } from 'ask-sdk-core';
const config = require('config');

import { LoggingRequestInterceptor, LoggingResponseInterceptor, LoadAttributesRequestInterceptor, SaveAttributesResponseInterceptor } from './interceptors';
import { LaunchRequestHandler, CancelAndStopIntentHandler, HelloWorldIntentHandler, SessionEndedRequestHandler, RequestErrorHandler } from './request-handlers';

const tableName = config.get('setup.tableName');

const getDBParams = () =>  (process.env.NODE_ENV === 'test') ?{ region: 'localhost', endpoint: 'http://localhost:8000' }:{};

const dynamoDbPersistenceAdapter: PersistenceAdapter = new DynamoDbPersistenceAdapter({ tableName, createTable: false, dynamoDBClient: new AWS.DynamoDB(getDBParams()) });

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
// TODO: --fix not working // switch from tslint to eslintQtypescript
// TODO: implement vars from config.get(stream etc.)
