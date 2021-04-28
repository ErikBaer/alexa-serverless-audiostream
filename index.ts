// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
import * as Alexa from 'ask-sdk';
import { RequestHandler, HandlerInput, ErrorHandler, PersistenceAdapter } from 'ask-sdk-core';
import { DynamoDbPersistenceAdapter } from 'ask-sdk-dynamodb-persistence-adapter'
import {LoggingRequestInterceptor,
            LoggingResponseInterceptor,
            LoadAttributesRequestInterceptor,
            SaveAttributesResponseInterceptor} from './interceptors'

const LaunchRequestHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput: HandlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        const sessionCounter = sessionAttributes['sessionCounter'];
        const speakOutputFirst: string = 'Hallo, das ist die Erstbegrüßung <audio src="soundbank://soundlibrary/aircrafts/futuristic/futuristic_04"/>';
        const speakOutputLater: string = 'Hallo das ist die Zweitbegrüßung! <audio src="soundbank://soundlibrary/aircrafts/futuristic/futuristic_11"/>'
        const speakOutput: string = !sessionCounter? speakOutputFirst: speakOutputLater
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .addAudioPlayerPlayDirective(
            'REPLACE_ALL',
            'https://wdr-wdr2-rheinland.icecastssl.wdr.de/wdr/wdr2/rheinland/mp3/128/stream.mp3',
            'stream-1',
             0,
             null)
            // .reprompt(speakOutput)
             .withShouldEndSession(true)
            .getResponse();
    }
};
const HelloWorldIntentHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput: HandlerInput) {
        const speakOutput = 'Hello World, this is baer data!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
const HelpIntentHandler = {
    canHandle(handlerInput: HandlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput: HandlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput: HandlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.PauseIntent" ||
            Alexa.getIntentName(handlerInput.requestEnvelope) ===
                    "AMAZON.CancelIntent" ||
                    Alexa.getIntentName(handlerInput.requestEnvelope) ===
                      "AMAZON.StopIntent")

    },
    handle(handlerInput: HandlerInput) {
        const speakOutput = 'Tschüss und bis zum nächsten mal';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .addAudioPlayerStopDirective()
            //.withShouldEndSession(true)
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput: HandlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput: HandlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput: HandlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput: HandlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler: ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput: HandlerInput, error: Error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Sorry, I had trouble doing what you asked. Please try again.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
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



    //TODO: clean up file, remove comments etc
    //TODO: make responses german (move to own file ? depends on time/effort)
    //TODO: move intents to own file (directories: handlers, interceptors, models, adapter))
    //TODO: add eslint (maybe check udacity proj. for reference, or google reference )

    //TODO: Check with Sebastian about desired requirements
    //TODO: move intents to own file (directories: handlers, interceptors, models, adapter))
    //TODO: Revise audio files (find nice jingles??)
    // QUESTION: Should i publish and he consumes; Or does he want to be able to release himself?
    // QUESTION: Soll der SKill bloss auf deutsch sein, oder möchte er ihn gerne internationalisiert sehen ?

