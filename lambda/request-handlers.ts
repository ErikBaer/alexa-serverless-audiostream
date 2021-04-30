import * as Alexa from 'ask-sdk';
import { RequestHandler, HandlerInput, ErrorHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';

const LaunchRequestHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput: HandlerInput): Response {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        const sessionCounter: number = sessionAttributes['sessionCounter'];
        const speakOutputFirst: string = '<amazon:emotion name="excited" intensity="low"> Hallo, das ist die Erstbegrüßung! </amazon:emotion> <audio src="soundbank://soundlibrary/aircrafts/futuristic/futuristic_04"/>';
        const speakOutputLater: string = '<amazon:emotion name="excited" intensity="low"> Hallo, das ist die Zweitbegrüßung!</amazon:emotion> <audio src="soundbank://soundlibrary/aircrafts/futuristic/futuristic_11"/>'
        const speakOutput: string = !sessionCounter? speakOutputFirst: speakOutputLater
        const audioItemMetadata: object = {
                title: "WRD2 - live-stream",
                subtitle: "präsentiert von baer data",

                }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .addAudioPlayerPlayDirective(
            'REPLACE_ALL',
            "https://wdr-wdr2-rheinland.icecastssl.wdr.de/wdr/wdr2/rheinland/mp3/128/stream.mp3",
            'baer-data-wrd2-steam-1',
             0,
             undefined,
             audioItemMetadata )
            .getResponse();
    }
};

const HelloWorldIntentHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput: HandlerInput): Response {
        const speakOutput:string = '<amazon:emotion name="excited" intensity="low"> Hallo, schön das es dich gibt! </amazon:emotion>';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.PauseIntent" ||
                Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.CancelIntent" ||
                Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.StopIntent")
    },
    handle(handlerInput: HandlerInput): Response {
        const speakOutput: string = '<amazon:emotion name="excited" intensity="low">Tschüss, und bis zum nächsten mal! </amazon:emotion>';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .addAudioPlayerStopDirective()
            .getResponse();
    }
};

const SessionEndedRequestHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput: HandlerInput): Response {
        return handlerInput.responseBuilder.getResponse();
    }
};

const RequestErrorHandler: ErrorHandler = {
    canHandle(): boolean {
        return true;
    },
    handle(handlerInput: HandlerInput, error: Error): Response {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput: string = `Entschuldigung, da ist anscheinend etwas schief gelaufen. Bitte versuche es noch einmal.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};


export  {LaunchRequestHandler, HelloWorldIntentHandler, CancelAndStopIntentHandler, SessionEndedRequestHandler, RequestErrorHandler}