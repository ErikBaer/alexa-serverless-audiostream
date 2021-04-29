import * as Alexa from 'ask-sdk';
import { DynamoDbPersistenceAdapter } from 'ask-sdk-dynamodb-persistence-adapter'
import {LoggingRequestInterceptor,
            LoggingResponseInterceptor,
            LoadAttributesRequestInterceptor,
            SaveAttributesResponseInterceptor} from './lambda/interceptors'

import {LaunchRequestHandler, HelloWorldIntentHandler, HelpIntentHandler, CancelAndStopIntentHandler,SessionEndedRequestHandler, RequestErrorHandler} from './lambda/request-handlers'


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
             new DynamoDbPersistenceAdapter({
                 tableName: 'usersTable',
                 createTable: false
             })
         )
    .lambda();



    //TODO: Check if all is typed up!
    //TODO: rename vars in LaunchRequestHandler; check naming overall! (also rename model file to make it more descriptive & generic at the same tim
    //TODO: add uris to  publishingInformation.locales.de-DE.largeIconUri etc. in yml
    //TODO: Add image and phrase to skill invocation


    //TODO: Maybe initiate DYNAMODB in sls.yml instead of adapter.*name-routing* Is is reasonable to keep it flexible?
    //TODO: Link with outputs ?*
    //TODO: Revise audio files (find nice jingles??)
    //TODO: maybe emphasize responses (Maybe even pick other voice?)
    //TODO: Test/adjust model-samples .. gehts auch ohne ? Sonst nimm gute!

    //TODO: Check with Sebastian about desired requirements
    // Question/Consideration: Write Docs / Document process / just howToRun ? Reconsider what you have done, right it down anyway to reproduce quality result!

