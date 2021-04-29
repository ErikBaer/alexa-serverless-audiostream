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



    //TODO: check naming overall! (also rename model file to make it more descriptive & generic at the same tim
    //TODO: add uris to  publishingInformation.locales.de-DE.largeIconUri etc. in yml
    //TODO: Add image and phrase to skill invocation
    //TODO: delete obsolet branches (local and remote)

    //TODO: Revise audio files (find nice jingles??)
    //TODO: maybe emphasize responses (Maybe even pick other voice?)
    //TODO: Test/adjust model-samples .. gehts auch ohne ? Sonst nimm gute!
    //TODO: delete obsolet branches (local and remote)

    //TODO: Check with Sebastian about desired requirements
    // Question/Consideration: Write Docs / Document process / just howToRun ? Reconsider what you have done, right it down anyway to reproduce quality result!

