import pino from 'pino';

export default pino({
  prettyPrint: { colorize: true },
  name       : 'alexa-streaming',
});
