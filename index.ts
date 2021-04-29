import * as Alexa from 'ask-sdk';
import { RequestHandler, HandlerInput, ErrorHandler, PersistenceAdapter } from 'ask-sdk-core';
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
                 tableName: 'user_sessions',
                 createTable: true
             })
         )
    .lambda();



    //TODO: move responses to own file !
    //TODO: Check if all is typed up!
    //TODO: rename vars in LaunchRequestHandler; check naming overall! (also rename model file to make it more descriptive & generic at the same time)
    //TODO: add eslint (maybe check udacity proj. for reference, or google reference )

    //TODO: Revise audio files (find nice jingles??)
    //TODO: maybe emphasize responses (Maybe even pick other voice?)
    //TODO: Test/adjust model-samples .. gehts auch ohne ? Sonst nimm gute!

    //TODO: Check with Sebastian about desired requirements
    // QUESTION: Should i publish and he consumes; Or does he want to be able to release himself?
    // QUESTION: Soll der SKill bloss auf deutsch sein, oder möchte er ihn gerne internationalisiert sehen ?
    // Question: Effort: move variables of interest into config file ?!? stream e.g.
    // Question/Consideration: Write Docs / Document process / just howToRun ? Reconsider what you have done, right it down anyway to reproduce quality result!

