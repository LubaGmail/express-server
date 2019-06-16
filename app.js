const EventEmitter = require('events');
const emitter = new EventEmitter();

const Logger = require('./logger');
const logger = new Logger();

logger.log('abc');


