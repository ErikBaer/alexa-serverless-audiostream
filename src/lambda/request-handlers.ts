/* eslint-disable @typescript-eslint/no-var-requires */
import * as Alexa from 'ask-sdk';
import { RequestHandler, HandlerInput, ErrorHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
const config = require('config');

import responses from '../responses/responses-de-DE';

const buildSSMLResponse = (emotion = '', intensity = '') =>
  (phrase:string, audio = ''):string => {
    const getReturnPhrase: string = emotion ? `<amazon:emotion name="${emotion}" intensity="${intensity}"> ${phrase} </amazon:emotion>`: phrase;
    const returnAudio: string = audio ? `<audio src="${audio}"/>` : '';
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
    const pickWelcomeOutput: ()=> string = () => !sessionCounter ? speakOutputFirst : speakOutputLater;

    const {url, name, title, subtitle} = config.get('stream')
    const audioItemMetadata: {title: string, subtitle: string} = { title, subtitle };

    return handlerInput.responseBuilder
            .speak(pickWelcomeOutput())
            .addAudioPlayerPlayDirective('REPLACE_ALL', url, name, 0, undefined, audioItemMetadata)
            .getResponse();
  },
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
  },
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
  },
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
  },
};

const SessionEndedRequestHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
  },
  handle(handlerInput: HandlerInput): Response {
    return handlerInput.responseBuilder.getResponse();
  },
};

export { LaunchRequestHandler, HelloWorldIntentHandler, CancelAndStopIntentHandler, SessionEndedRequestHandler, RequestErrorHandler, buildSSMLResponse };
