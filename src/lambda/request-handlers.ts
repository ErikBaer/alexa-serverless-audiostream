/* eslint-disable @typescript-eslint/no-var-requires,max-len, @typescript-eslint/no-non-null-assertion */
import * as Alexa from 'ask-sdk';
import { RequestHandler, HandlerInput, ErrorHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import logger from '../utils/logger';
import responses from '../responses/responses-de-DE';

const {
  welcomePhraseOne, welcomePhraseTwo, farewellPhrase, helloWorldPhrase, errorPhrase, welcomeAudioOne, welcomeAudioTwo,
} = responses;

const getReturnPhrase = (emotion:string, intensity:string, phrase:string) => (emotion ? `<amazon:emotion name="${emotion}" intensity="${intensity}"> ${phrase} </amazon:emotion>` : phrase);

const getReturnAudio = (audio:string) => (audio ? `<audio src="${audio}"/>` : '');

const buildSSMLResponse = (emotion = '', intensity = '') => (phrase:string, audio = ''):string => getReturnPhrase(emotion, intensity, phrase) + getReturnAudio(audio);

const LaunchRequestHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
  },
  handle(handlerInput: HandlerInput): Response {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

    const speakOutput = () => (!sessionAttributes.sessionCounter
      ? buildSSMLResponse('excited', 'low')(welcomePhraseOne, welcomeAudioOne)
      : buildSSMLResponse('excited', 'low')(welcomePhraseTwo, welcomeAudioTwo));

    const streamUrl: string = process.env.streamUrl!;
    const streamName: string = process.env.streamName!;

    const audioItemMetadata = { title: process.env.streamTitle, subtitle: process.env.streamSubTitle };

    return handlerInput.responseBuilder
      .speak(speakOutput())
      .addAudioPlayerPlayDirective('REPLACE_ALL', streamUrl, streamName, 0, undefined, audioItemMetadata)
      .getResponse();
  },
};

const CancelAndStopIntentHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.PauseIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
  },
  handle(handlerInput: HandlerInput): Response {
    const speakOutput: string = buildSSMLResponse('excited', 'low')(farewellPhrase);
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
    logger.info(`~~~~ Error handled: ${error.stack}`);
    const speakOutput: string = buildSSMLResponse()(errorPhrase);

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
    const speakOutput: string = buildSSMLResponse('excited', 'low')(helloWorldPhrase);
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

export {
  LaunchRequestHandler, HelloWorldIntentHandler, CancelAndStopIntentHandler, SessionEndedRequestHandler, RequestErrorHandler, buildSSMLResponse,
};
