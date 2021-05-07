import responses from '../responses/responses-de-DE';
import { buildSSMLResponse } from './request-handlers';

const alexaTest = require('alexa-skill-test-framework');

const {
  welcomePhraseOne,
  welcomePhraseTwo,
  welcomeAudioOne,
  welcomeAudioTwo,
  farewellPhrase,
  helloWorldPhrase,
} = responses;

const url = 'https://wdr-wdr2-rheinland.icecastssl.wdr.de/wdr/wdr2/rheinland/mp3/128/stream.mp3';
const name = 'WRD2 - Baer Data';

process.env.NODE_ENV = 'test';
process.env.streamUrl = url;
process.env.streamName = name;

// initialize the testing framework
alexaTest.initialize(
  require('./index'),
  'amzn1.ask.skill.00000000-0000-0000-0000-000000000000',
  'amzn1.ask.account.VOID',
);

alexaTest.setLocale('de-DE');

// **Baer Data Streaming Skill Tests**

describe('BaerData Skill', () => {
  //* *LaunchRequest**

  describe('LaunchRequest', () => {
    describe('should return the correct initial welcome response', () => {
      alexaTest.test([
        {
          request: alexaTest.getLaunchRequest(),
          says   : buildSSMLResponse('excited', 'low')(welcomePhraseOne, welcomeAudioOne),
        },
      ]);
    });

    describe('should add the correct recurring welcome response', () => {
      alexaTest.test([
        {
          request: alexaTest.getLaunchRequest(),
          says   : buildSSMLResponse('excited', 'low')(welcomePhraseTwo, welcomeAudioTwo),
        },
      ]);
    });

    describe('should add an AudioPlayerPlayDirective', () => {
      alexaTest.test([
        {
          request    : alexaTest.getLaunchRequest(),
          playsStream: {
            behavior: 'REPLACE_ALL',
            url,
            name,
          },
        },
      ]);
    });

    describe('should end the session', () => {
      alexaTest.test([
        {
          request         : alexaTest.getLaunchRequest(),
          shouldEndSession: true,
        },
      ]);
    });
  });

  //* *StopIntent**

  describe('StopIntent', () => {
    describe('should return the correct response', () => {
      alexaTest.test([
        {
          request: alexaTest.getIntentRequest('AMAZON.StopIntent'),
          says   : buildSSMLResponse('excited', 'low')(farewellPhrase),
        },
      ]);
    });

    describe('should stop the AudioPlayer', () => {
      alexaTest.test([
        {
          request    : alexaTest.getIntentRequest('AMAZON.StopIntent'),
          stopsStream: true,
        },
      ]);
    });

    describe('should end the session', () => {
      alexaTest.test([
        {
          request         : alexaTest.getIntentRequest('AMAZON.StopIntent'),
          shouldEndSession: true,
        },
      ]);
    });
  });

  //* *PauseIntent**

  describe('PauseIntent', () => {
    describe('should return the correct response', () => {
      alexaTest.test([
        {
          request: alexaTest.getIntentRequest('AMAZON.PauseIntent'),
          says   : buildSSMLResponse('excited', 'low')(farewellPhrase),
        },
      ]);
    });

    describe('should stop the AudioPlayer', () => {
      alexaTest.test([
        {
          request    : alexaTest.getIntentRequest('AMAZON.PauseIntent'),
          stopsStream: true,
        },
      ]);
    });

    describe('should end the session', () => {
      alexaTest.test([
        {
          request         : alexaTest.getIntentRequest('AMAZON.PauseIntent'),
          shouldEndSession: true,
        },
      ]);
    });
  });

  //* *CancelIntent**

  describe('CancelIntent', () => {
    describe('should return the farewell response', () => {
      alexaTest.test([
        {
          request: alexaTest.getIntentRequest('AMAZON.CancelIntent'),
          says   : buildSSMLResponse('excited', 'low')(farewellPhrase),
        },
      ]);
    });

    describe('should stop the AudioPlayer', () => {
      alexaTest.test([
        {
          request    : alexaTest.getIntentRequest('AMAZON.CancelIntent'),
          stopsStream: true,
        },
      ]);
    });

    describe('should end the session', () => {
      alexaTest.test([
        {
          request         : alexaTest.getIntentRequest('AMAZON.PauseIntent'),
          shouldEndSession: true,
        },
      ]);
    });
  });

  //* *HelloWorldIntent**

  describe('HelloWorldIntent', () => {
    describe('should return the correct response', () => {
      alexaTest.test([
        {
          request: alexaTest.getIntentRequest('HelloWorldIntent'),
          says   : buildSSMLResponse('excited', 'low')(helloWorldPhrase),
        },
      ]);
    });
    describe('should end the session', () => {
      alexaTest.test([
        {
          request         : alexaTest.getIntentRequest('HelloWorldIntent'),
          shouldEndSession: true,
        },
      ]);
    });
  });
});
