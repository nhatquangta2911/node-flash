/*
   // Global object, create and load a module
   // Module Wrapper Function
   const logger = require('./logger');
   logger.log('Quang');
   */

/*
   // Path module
   const path = require('path');
   const pathObject = path.parse(__filename);
   console.log(pathObject);
   */

/*
   // OS module
   const os = require('os');
   const totalMemory = os.totalmem();
   const freeMemory = os.freemem();
   console.log(`Total Memory: ${totalMemory} \nFree Memory: ${freeMemory}`);
   
*/

/*
// File system module (sync X, async)
   const fs = require('fs');
   fs.readdir('./', (err, files) => {
      if (err) {
         console.log('Error ', err);
      } else {
         console.log('Result ', files);
      }
   });
*/

/*
   // Events module
   // class EventEmitter 
   const EventEmitter = require('events'); 
   // const emitter = new EventEmitter();
   // emit = produce, signal (ra hieu), raise an event

   // register a listerner
   // when raising an event, a callback f() will be called
   const Logger = require('./logger');
   const logger = new Logger();

   logger.on('messageLogged', (arg) => {
      console.log('Listener called', arg); 
   });

   logger.log('message');
*/

// HTTP module
const http = require('http');
const server = http.createServer((req, res) => {
   if (req.url === '/') {
      res.write('Hello world');
      res.end();
   }
   if (req.url === '/about') {
      res.write('Just a test');
      res.end();
   }
});

// server.on('connection', (socket) => {
//    console.log('New connection...');
// });

// listen on port 2911 -> request, server raise the event
server.listen(2911);

console.log('Listening on port 3000...');