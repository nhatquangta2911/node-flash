# node-flash

The flash project has been making for studying and practice NodeJS. (During The complete course of Mosh)

The content will be added gradually after each section (and it's going to be super super brief)

## Section 1: Getting Started

-  **Node is a runtime environment for executing JS code**
-  Node is a C++ program that embeds Chrome’s **v8** engine
-  Perfect choice for building _RESTful services_
-  **Single-threaded**, **asynchronous** or non-blocking by default
-  Building **I/O-intensive** applications
-  No window, document object
   Objects for working with the file system, network, operating system, etc.

## Section 2: Node Core

-  No window object, just **global** object in Node

#####

-  In Javascript
   ```javascript
   // possible
   const a = 2;
   console.log(window.a);
   console.log(a);
   ```
-  But in Node, we can not add variables or functions to the **global** object

   ```javascript
   const a = 2;
   const b = global.a + 2; // Impossible
   ```

   Variable a is just exist in this file locally

   #####

-  Each file ~ 1 module
-  Node automatically wraps the code in the module (file) with an **IIFE** (Immediately invoked function expression)
   _That's how Node work to make it local_
   #####
-  Export:

   ```javascript
   // as a function or a variable
   module.exports.log = log;
   // or as an object
   module.exports = log;
   ```

-  Each module has the global object (actually not global)
   ```javascript
   console.log(global.module);
   module {
   ...
   exports: { ... } // an object
   ...
   }
   ```
-  Load a module

```javascript
const logger = require("./logger");
```

-  Node built-in modules enables us to work with:

   -  File system module (fs)
   -  Path module (path)
   -  Operating System (os)
   -  Network (http)
   -  Events (events)

   #####

-  EventEmitter - core class in Node, allows us:
   -  To raise (emit, signal, produce) an **event**
   -  To handle events
   -  Several built-in classes in Node **derive (is based on)** from EventEmitter class
   -  To create a class with the ability to raise events:
   #####
   ```javascript
   class Logger extends EventEmitter {
      // I can raise events =)) Stop it dude!
   }
   ```

## Section 3: Node Package Manager (npm)

## Section 4: Building RESTful APIs Using Express

## Section 5: Express Advanced

## Section 6: Asynchronous Javascript

## Section 7: CRUD Operations Using Mongoose

## Section 8: Mongo - Data Validation

## Section 9: Mongoose - Modeling Relationships between connected data

## Section 10: Authentication & Authorization

## Section 11: Handling & Logging Errors

## Section 12: Unit Testing

## Section 13: Integration Testing

## Section 14: Test-driven Development

## Section 15: Deployment
