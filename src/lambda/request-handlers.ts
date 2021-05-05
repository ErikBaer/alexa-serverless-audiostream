import * as Alexa from 'ask-sdk';
import { RequestHandler, HandlerInput, ErrorHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';

import responses from '../responses/responses-de-DE';

const buildSSMLResponse: Function = (emotion = '', intensity = ''): Function =>
    (phrase: string, audio = ''): string => {
        const returnPhrase: string = emotion ? `<amazon:emotion name="${emotion}" intensity="${intensity}"> ${phrase} </amazon:emotion>` : phrase;
        const returnAudio: string =  audio ? `<audio src="${audio}"/>` : '';
        return returnPhrase + returnAudio;
};

const LaunchRequestHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput: HandlerInput): Response {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        const sessionCounter: number = sessionAttributes['sessionCounter'];

        const speakOutputFirst: string = buildSSMLResponse('excited', 'low')(responses.welcomePhraseOne, responses.welcomeAudioOne);
        const speakOutputLater: string = buildSSMLResponse('excited', 'low')(responses.welcomePhraseTwo, responses.welcomeAudioTwo);
        const speakOutput: string = !sessionCounter ? speakOutputFirst : speakOutputLater;

        const streamUrl: string = process.env.streamUrl!;
        const streamName: string = process.env.streamName!;
        const audioItemMetadata: object = {title: process.env.streamTitle, subtitle: process.env.StreamSubTitle};

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .addAudioPlayerPlayDirective('REPLACE_ALL', streamUrl, streamName, 0, undefined, audioItemMetadata)
            .getResponse();
    }
};

const CancelAndStopIntentHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.PauseIntent' ||
                Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent' ||
                Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput: HandlerInput): Response {
        const speakOutput: string = buildSSMLResponse('excited', 'low')(responses.farewellPhrase);
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .addAudioPlayerStopDirective()
            .getResponse();
    }
};

const ResumeIntentHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.ResumeIntent';
    },
    handle(handlerInput: HandlerInput): Response {

        const streamUrl: string = process.env.streamUrl!;
        const streamName: string = process.env.streamName!;
        const audioItemMetadata: object = {title: process.env.streamTitle, subtitle: process.env.StreamSubTitle};
        return handlerInput.responseBuilder
            .addAudioPlayerPlayDirective('REPLACE_ALL', streamUrl, streamName, 0, undefined, audioItemMetadata)
            .getResponse();
    }
};

const RequestErrorHandler: ErrorHandler = {
    canHandle(): boolean {
        return true;
    },
    handle(handlerInput: HandlerInput, error: Error): Response {
        // tslint:disable-next-line:no-console
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput: string = buildSSMLResponse()(responses.errorPhrase);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const HelloWorldIntentHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput: HandlerInput): Response {
        const speakOutput: string = buildSSMLResponse('excited', 'low')(responses.helloWorldPhrase);
        return handlerInput.responseBuilder
            .speak(speakOutput)
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


export  { LaunchRequestHandler, HelloWorldIntentHandler, CancelAndStopIntentHandler, ResumeIntentHandler, SessionEndedRequestHandler, RequestErrorHandler, buildSSMLResponse };