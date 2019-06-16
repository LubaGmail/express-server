const EventEmitter = require('events');
const url = 'http://abc/net/log';

class Logger extends EventEmitter {
    log (msg) {
        console.log('\nLogger. received event ', msg);
         // raise an event
        this.emit('logger. message logged', {id: 1, url: url});
    }
}

module.exports = Logger;



