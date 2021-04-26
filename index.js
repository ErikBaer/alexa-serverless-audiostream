'use strict';
const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
canHandle(handlerInput) {
return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
handle(handlerInput) {
const speechText = 'Hallo, das ist baer data am Apparat!';
return handlerInput.responseBuilder
.speak(speechText)
.reprompt(speechText)
.withSimpleCard('Hello User', speechText)
.getResponse();
    }
}

const HelloWorldIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === 'HelloWorldIntent';
  },
handle(handlerInput) {
const speechText = 'Hello World!';
return handlerInput.responseBuilder
.speak(speechText)
.withSimpleCard('Hello World!', speechText)
.getResponse();
     }
};

exports.handler = Alexa.SkillBuilders.custom()
     .addRequestHandlers(LaunchRequestHandler,
                         HelloWorldIntentHandler)
     .lambda();
