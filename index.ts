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
    // TODO: deploy-error-warning: ask cli types ?!?*?

    //TODO: Dryrun fresh deployment
    //TODO: wright short deploy script
    //TODO: Write Docs /   howToRun / whats used / functionality / example usage? Reconsider what you have done, right it down anyway to reproduce quality result!

