import * as Alexa from 'ask-sdk';
import { HandlerInput, RequestInterceptor, ResponseInterceptor } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import logger from '../utils/logger';

const PersistentAttributesNames = ['sessionCounter'];

const LoggingRequestInterceptor: ResponseInterceptor = {
  process(handlerInput: HandlerInput): void {
    logger.info(`Incoming request: ${JSON.stringify(handlerInput.requestEnvelope)}`);
  },
};

const LoggingResponseInterceptor: ResponseInterceptor = {
  process(_: HandlerInput, response: Response): void {
    logger.info(`Outgoing response: ${JSON.stringify(response)}`);
  },
};

const LoadAttributesRequestInterceptor: RequestInterceptor = {
  async process(handlerInput: HandlerInput): Promise<void> {
    const { attributesManager, requestEnvelope } = handlerInput;
    const sessionAttributes = attributesManager.getSessionAttributes();
    // double check for new session
    if (Alexa.isNewSession(requestEnvelope) || !sessionAttributes.loaded) {
      const persistentAttributes = (await attributesManager.getPersistentAttributes()) || {};
      logger.info(`Loading from persistent storage: ${JSON.stringify(persistentAttributes)}`);
      persistentAttributes.loaded = true;
      attributesManager.setSessionAttributes(persistentAttributes);
    }
  },
};

const SaveAttributesResponseInterceptor: ResponseInterceptor = {
  async process(handlerInput: HandlerInput, response: Response): Promise<void> {
    if (!response) {
      return;
    } // avoid intercepting calls that have no outgoing response due to errors
    const { attributesManager, requestEnvelope } = handlerInput;
    const sessionAttributes = attributesManager.getSessionAttributes();
    const shouldEndSession: boolean = typeof response.shouldEndSession === 'undefined' ? true : response.shouldEndSession; // is this a session end?
    const loadedThisSession: boolean = sessionAttributes.loaded;
    if (
      (shouldEndSession || Alexa.getRequestType(requestEnvelope) === 'SessionEndedRequest')
            && loadedThisSession
    ) {
      // skill was stopped or timed out
      sessionAttributes.sessionCounter = sessionAttributes.sessionCounter
        ? sessionAttributes.sessionCounter + 1
        : 1;

      Object.entries(sessionAttributes).forEach(([key]) => {
        if (!PersistentAttributesNames.includes(key)) {
          delete sessionAttributes[key];
        }
      });

      logger.info(`Saving to persistent storage:${JSON.stringify(sessionAttributes)}`);
      attributesManager.setPersistentAttributes(sessionAttributes);
      await attributesManager.savePersistentAttributes();
    }
  },
};

export {
  LoggingRequestInterceptor,
  LoggingResponseInterceptor,
  LoadAttributesRequestInterceptor,
  SaveAttributesResponseInterceptor,
};
