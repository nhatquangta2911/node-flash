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

-  npm:

   -  a command line tool (to install whatever you need for you Node application)
   -  a **registry** of 3rd party library
   -  the npm registry hosts approximately half a million packages for free and reusable
   -  npm ~ maven npm < yarn maven < gradle

   ######

-  Before using any Node packages:

```
   // Create packgae.json file
   npm init --yes
```

-  Installing a Node package:

```
   npm i underscore
   // or
   npm i underscore --save (flag)
```

-  Each module has its own package.json file (store the information of the module, name and version)

   -  package.json of Node application
   -  package.json of underscore module

   ######

-  Using a package
   ######
   ```javascript
   const _ = require("underscore");
   ```
   ######
-  Node will find the proper module in the following order:

   -  Built-in modules (Core modules)
   -  Files (modules) or folders in your Node application
   -  node_modules folders (after installing necessary package)

   ######

-  .gitignore file should skip the node_modules (it was very massive!)

   ######

   ```.gitignore
   node_modules/
   ```

   ######

-  EX. mongoose has **dependency** to async, debug, lodash, mongodb module

-  Semantic Versioning

######

```json
"dependencies": {
   "mongoose": "^4.13.6",
   "lodash": "~2.12.3",
   "underscore": "2.2.20"
}
```

-  **major.minor.patch**

   ######

   -  major version: break the previous APIs
   -  minor version: not affect the previous APIs, add new features
   -  patch version: bug fix

   ######

-  **^** 4.2.4 = 4.x (caret)
-  **~** 2.12.3 = 2.13.x (tidle)

#####

-  Some of the useful commands:

#####

```
   $ npm list
   $ npm list --depth-0
   $ npm view mongoose
   $ npm i mongoose@2.4.2
   $ npm outdated
   $ npm update
   $ npm i -g npm-check-updates
   $ ncu -u (just update) npm i
   $ npm i jshint -g --save-dev
   $ npm un mongoose
   $ npm addUser
   $ npm login
   $ npm publish
```

######

-  **DevDependencies**: tools for

   ######

   -  writing Unit Test
   -  Bundling for JS code
   -  Static Analysis for Code (jshint)

   ######

   -  **Should not** go into prooduction environment (where we deploy the app)

######

######

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
