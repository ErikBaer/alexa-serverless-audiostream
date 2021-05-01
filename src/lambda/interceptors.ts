const Alexa = require('ask-sdk-core');
import { HandlerInput} from 'ask-sdk-core';
import {Response} from 'ask-sdk-model'


const PERSISTENT_ATTRIBUTES_NAMES = [ 'sessionCounter'];

// This request interceptor will log all incoming requests to this lambda
const LoggingRequestInterceptor = {
    process(handlerInput: HandlerInput): void {
        console.log(`Incoming request: ${JSON.stringify(handlerInput.requestEnvelope)}`);
    }
};

// This response interceptor will log all outgoing responses of this lambda
const LoggingResponseInterceptor = {
    process(_: HandlerInput, response: Response): void {
        console.log(`Outgoing response: ${JSON.stringify(response)}`);
    }
};

const LoadAttributesRequestInterceptor = {
    async process(handlerInput: HandlerInput) : Promise<void>{
        const {attributesManager, requestEnvelope} = handlerInput;
        const sessionAttributes = attributesManager.getSessionAttributes();
        // the "loaded" check is because the "new" session flag is lost if there's a one shot utterance that hits an intent with auto-delegate
        if (Alexa.isNewSession(requestEnvelope) || !sessionAttributes['loaded']){ //is this a new session? not loaded from db?
            const persistentAttributes = await attributesManager.getPersistentAttributes() || {};
            console.log('Loading from persistent storage: ' + JSON.stringify(persistentAttributes));
            persistentAttributes['loaded'] = true;
            //copy persistent attribute to session attributes
            attributesManager.setSessionAttributes(persistentAttributes); // ALL persistent attributtes are now session attributes
        }
    }
};

const SaveAttributesResponseInterceptor = {
    async process(handlerInput: HandlerInput, response: Response): Promise<void> {
        if (!response) return; // avoid intercepting calls that have no outgoing response due to errors
        const {attributesManager, requestEnvelope} = handlerInput;
        const sessionAttributes = attributesManager.getSessionAttributes();
        const shouldEndSession: boolean = (typeof response.shouldEndSession === "undefined" ? true : response.shouldEndSession); //is this a session end?
        // the "loaded" check is because the session "new" flag is lost if there's a one shot utterance that hits an intent with auto-delegate
        const loadedThisSession: boolean = sessionAttributes['loaded'];
        if ((shouldEndSession || Alexa.getRequestType(requestEnvelope) === 'SessionEndedRequest') && loadedThisSession) { // skill was stopped or timed out

            sessionAttributes['sessionCounter'] = sessionAttributes['sessionCounter'] ? sessionAttributes['sessionCounter'] + 1 : 1;
            for (var key in sessionAttributes) {
                if (!PERSISTENT_ATTRIBUTES_NAMES.includes(key))
                    delete sessionAttributes[key];
            }
            console.log('Saving to persistent storage:' + JSON.stringify(sessionAttributes));
            attributesManager.setPersistentAttributes(sessionAttributes);
            await attributesManager.savePersistentAttributes();
        }
    }
};





export {
    LoggingRequestInterceptor,
    LoggingResponseInterceptor,
    LoadAttributesRequestInterceptor,
    SaveAttributesResponseInterceptor,
}