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
            .getResponse();
    }
};

const HelloWorldIntentHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput: HandlerInput) {
        const speakOutput = 'Hallo, schön das es dich gibt!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput: HandlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput: HandlerInput) {
        const speakOutput = 'Hallo, wie kann ich dir helfen?';
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
                Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.CancelIntent" ||
                Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.StopIntent")
    },
    handle(handlerInput: HandlerInput) {
        const speakOutput = 'Tschüss und bis zum nächsten mal';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .addAudioPlayerStopDirective()
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput: HandlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput: HandlerInput) {
        return handlerInput.responseBuilder.getResponse();
    }
};

const ErrorHandler: ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput: HandlerInput, error: Error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Entschuldigung, da ist anscheinend etwas schief gelaufen. Bitte versuche es noch einmal.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
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



    //TODO: move responses to own file ? (depends on time/effort)
    //TODO: move intents to own file (directories: handlers, models, adapter( / or util? maybe take tut-util/or rather not.look at it for a second))
    //TODO: add eslint (maybe check udacity proj. for reference, or google reference )

    //TODO: Revise audio files (find nice jingles??)
    //TODO: maybe emphasize responses (Maybe even pick other voice?)

    //TODO: Check with Sebastian about desired requirements
    // QUESTION: Should i publish and he consumes; Or does he want to be able to release himself?
    // QUESTION: Soll der SKill bloss auf deutsch sein, oder möchte er ihn gerne internationalisiert sehen ?

