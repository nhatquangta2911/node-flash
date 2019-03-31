const EventEmitter = require('events');

class Logger extends EventEmitter {
   // Basic f() and additional methods
   log(name) {
      console.log(name);
      // Raise an event 
      this.emit('messageLogged', { id: 1, url: 'http://' });
   } 
}

module.exports = Logger;