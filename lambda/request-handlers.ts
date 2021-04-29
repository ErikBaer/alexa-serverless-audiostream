import * as Alexa from 'ask-sdk';
import { RequestHandler, HandlerInput, ErrorHandler } from 'ask-sdk-core';

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

const RequestErrorHandler: ErrorHandler = {
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


export  {LaunchRequestHandler, HelloWorldIntentHandler, HelpIntentHandler, CancelAndStopIntentHandler, SessionEndedRequestHandler, RequestErrorHandler}