const alexaTest = require('alexa-skill-test-framework');

const {buildSSMLResponse} = require ('../../../src/lambda/request-handlers')
import responses from '../../../src/responses/responses-de-DE'

const url= 'https://wdr-wdr2-rheinland.icecastssl.wdr.de/wdr/wdr2/rheinland/mp3/128/stream.mp3'
const token = 'WRD2 - Baer Data'

process.env.NODE_ENV = 'test'
process.env.AWS_REGION = 'eu-central-1'
process.env.streamUrl = url
process.env.streamName = token

// initialize the testing framework
alexaTest.initialize(
	require('../../../src/lambda/index'),
	"amzn1.ask.skill.00000000-0000-0000-0000-000000000000",
	"amzn1.ask.account.VOID");

alexaTest.setLocale('de-DE')

// **Baer Data Streaming Skill Tests**

describe("BaerData Skill", function () {

	//**LaunchRequest**

	describe("LaunchRequest", function () {
        describe('should return the correct initial welcome response', function() {
                    alexaTest.test([
                        {
                            request: alexaTest.getLaunchRequest(),
                            says: buildSSMLResponse("excited", "low")(responses.welcomePhraseOne, responses.welcomeAudioOne)
                        }
                ]);
            })

        describe('should add the correct recurring welcome response', function() {
                            alexaTest.test([
                                {
                                    request: alexaTest.getLaunchRequest(),
                                    says: buildSSMLResponse("excited", "low")(responses.welcomePhraseTwo, responses.welcomeAudioTwo)
                                }
                        ]);
                    })

        describe('should add an AudioPlayerPlayDirective', function() {
                    alexaTest.test([
                        {
                            request: alexaTest.getLaunchRequest(),
                            playsStream: {
                                            behavior: 'REPLACE_ALL',
                                            url,
                                            token
                                         }
                        }
                    ]);
            })

        describe('should end the session', function() {
                     alexaTest.test([
                            {
                               request: alexaTest.getLaunchRequest(),
                               shouldEndSession: true
                            }
                    ]);
            })

        })

    //**StopIntent**

    describe("StopIntent", function () {
        describe('should return the correct response', function() {
                    alexaTest.test([
                        {
                            request: alexaTest.getIntentRequest("AMAZON.StopIntent"),
                            says: buildSSMLResponse("excited", "low")(responses.farewellPhrase)
                        }
                ]);
            })

        describe('should stop the AudioPlayer', function() {
                    alexaTest.test([
                        {
                            request: alexaTest.getIntentRequest("AMAZON.StopIntent"),
                            stopsStream: true
                        }
                    ]);
            })

        describe('should end the session', function() {
                     alexaTest.test([
                            {
                               request: alexaTest.getIntentRequest("AMAZON.StopIntent"),
                               shouldEndSession: true
                            }
                    ]);
            })
        })

   //**PauseIntent**

    describe("PauseIntent", function () {
            describe('should return the correct response', function() {
                        alexaTest.test([
                            {
                                request: alexaTest.getIntentRequest("AMAZON.PauseIntent"),
                                says: buildSSMLResponse("excited", "low")(responses.farewellPhrase)
                            }
                    ]);
                })

            describe('should stop the AudioPlayer', function() {
                        alexaTest.test([
                            {
                                request: alexaTest.getIntentRequest("AMAZON.PauseIntent"),
                                stopsStream: true
                            }
                        ]);
                })

            describe('should end the session', function() {
                         alexaTest.test([
                                {
                                   request: alexaTest.getIntentRequest("AMAZON.PauseIntent"),
                                   shouldEndSession: true
                                }
                        ]);
                })
        })

    //**CancelIntent**

    describe("CancelIntent", function () {
            describe('should return the farewell response', function() {
                        alexaTest.test([
                            {
                                request: alexaTest.getIntentRequest("AMAZON.CancelIntent"),
                                says: buildSSMLResponse("excited", "low")(responses.farewellPhrase)
                            }
                    ]);
                })

            describe('should stop the AudioPlayer', function() {
                        alexaTest.test([
                            {
                                request: alexaTest.getIntentRequest("AMAZON.CancelIntent"),
                                stopsStream: true
                            }
                        ]);
                })

            describe('should end the session', function() {
                         alexaTest.test([
                                {
                                   request: alexaTest.getIntentRequest("AMAZON.PauseIntent"),
                                   shouldEndSession: true
                                }
                        ]);
                })
        })

    //**HelloWorldIntent**

    describe("HelloWorldIntent", function () {

        describe('should return the correct response', function() {
                    alexaTest.test([
                        {
                            request: alexaTest.getIntentRequest("HelloWorldIntent"),
                            says: buildSSMLResponse("excited", "low")(responses.helloWorldPhrase)
                        }
                    ]);
            })
        describe('should end the session', function() {
                    alexaTest.test([
                        {
                            request: alexaTest.getIntentRequest("HelloWorldIntent"),
                            shouldEndSession: true
                        }
                    ]);
            })
        });

    });


//TODO: deploy, test functionality and push

//TODO: communicate finalized result *here*!

