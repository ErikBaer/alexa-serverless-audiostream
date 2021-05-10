import * as Alexa from 'ask-sdk';
import getDynamoDbPersistenceAdapter from '../utils/db-adapter';

import {
  LoggingRequestInterceptor,
  LoggingResponseInterceptor,
  LoadAttributesRequestInterceptor,
  SaveAttributesResponseInterceptor,
} from './interceptors';
import {
  LaunchRequestHandler,
  CancelAndStopIntentHandler,
  HelloWorldIntentHandler,
  SessionEndedRequestHandler,
  RequestErrorHandler,
} from './request-handlers';

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    CancelAndStopIntentHandler,
    HelloWorldIntentHandler,
    SessionEndedRequestHandler,
  )
  .addErrorHandlers(RequestErrorHandler)
  .addRequestInterceptors(LoadAttributesRequestInterceptor, LoggingRequestInterceptor)
  .addResponseInterceptors(LoggingResponseInterceptor, SaveAttributesResponseInterceptor)
  .withPersistenceAdapter(getDynamoDbPersistenceAdapter())
  .lambda();

//TODO: Readme: add AWS_Creds to pipeline vars
//TODO: adjust test-messages to be more descriptive