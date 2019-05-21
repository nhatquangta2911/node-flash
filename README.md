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

###

## Section 4: Building RESTful APIs Using Express

#####

-  Express is the fast, lightweight **framework** for building web application with perfect documentation.
-  API

   ######

   -  Web API: supply API in web format
   -  API in OS: e.g. Microsoft gives us OS and API doc (f, call) helps us create app directly interact with OS
   -  API of library, framework

   ######

-  Client (the app itself) call services by sending http request to the server.

-  REST: convention, constraint

   ######

   -  Client-Server architecture
   -  Stateless (req1 != know **nothing** about req2)
   -  Cacheability
   -  Layered system
   -  Uniform interface

   ######

-  In stead of using a bunch of if-else statements, we should use Express framework to easliy add more **Route** and maintainable.

######

-  BASIS:

   ######

   ```javascript
   app.get("/api/courses", (req, res) => {
      res.send(courses);
   });
   ```

   ######

-  **Joi** package, **_don't trust_** whatever the client send in the request

######

-  **404** or **400** (Bad request) should **return immediately**, in order to not execute the following code block

#####

## Section 5: Express Advanced

######

-  **Middleware** - _Core concept_

   ######

   -  In **SE**, middlware is a software that is in the mist of kernel of the OS and the application interacting directly with. (e.g. game)
   -  In Node, middleware is a **function that pre-process the requests**before handling logic business or adjust the response accordingly right before sending back to the Client (other applications)
   -  4 params: **req, res, next, err** (option)
   -  Middleware does:
      ######
      -  any code
      -  change requests, responses
      -  terminate req-res processes
      -  next() call another middleware in a stack
      ######
   -  5 level

      ######

      -  App-level Mw

         ######

         ```javascript
            const app = express();

            // express.json() returns a Mw function
            // Job: parse body of the request into a JSON object
            app.use(express.json());

            app.get(...);
            app.post(...);
         ```

         Request -> json() -> do login -> do auth -> route -> Response
         It can terminate at **any** stage or pass its control to another Mw in the Request Processing Pipeline

         ######

      -  Router-level Mw
         Use for **avoiding app config**
         ######
         ```javascript
            var router = express.Router();
            router.use(...);
            router.get(...);
            router.post(...);
         ```
         ######
      -  Error-handling Mw (always 4 params - **err** first)

      ######

      -  Built-in Mw (only 1 module: express.static)
         ######
         ```javascript
         express.json();
         express.urlencoded(); // key, value
         express.static(); // serve static content (img, html...)
         ```
         ######
      -  3rd party Mw
         ```javascript
         app.use(helmet()); // more secure
         app.use(morgan()); // Log HTTP info
         ```

      ######

   -  ENVIRONMENT

      ######

      -  **Development Env** (Enable/ Disable certain features based on client environment)
      -  **Production Env**

      ######

      -  global object in Node:

      ######

      ```javascript
      process.env.NODE_ENV;
      app.get("env"); // development env by default
      ```

      ######

      -  4 env:
         ######
         -  Production
         -  Development
         -  Testing
         -  Staging
         ######

      ######

      -  e.g. Enable **morgan** (logging HTTP request) **only in dev machine**:
         ######
         ```javascript
         if (app.get("env") === "development") {
            app.use(morgan("tiny"));
            console.log("morgan enabled...");
         }
         ```
         ######

      ######

      -  **Config** (npm module -> helps storing in variables)
         ######
         ```
            EXPORT app_password = 1234
         ```
         ```javascript
         config.get("mail.password");
         ```
         ######
      -  **Debugging** - _Log messages when debugging_
         ######
         Use debug package
         ######
         ```
         $ npm i debug
         ```
         ######
         ```javascript
         const dbDebugger = require("debug")("app:db");
         const startUpDebugger = require("debug")("app:startup");
         ```
         ######
         ```
            EXPORT DEBUG = app:startup
            EXPORT DEBUG = app:*
            // or
            DEBUG = app:db nodemon index.js
         ```
         ######
      -  **Template Engine**
         ######
         -  Generate dynamic HTML (return to Client)
         -  **.pug** -> .html
         ######
         ```
         html
            head
               title: title
            body
               h1: message
               ...
         ```
         ######
      -  Building Maintainable Routes

         ######

         ```javascipt
            app.use('api/courses', courses);
         ```

         ######

         !!! Remember: module.exports = **router** ;

         ######

######

## Section 6: Asynchronous Javascript

   - Async - non-blocking (only ont thread)
   - It includes: Callbacks, Promises, Async/await
   ```javascript
 
      function getUser = (id, callback) => {
         setTimeout(() => {
            console.log('...Getting from a Database');
            callback({id: 2, githubRepository: 'mosh'});
         }, 2000);
      }

   ```
   - **Callback** will be called when the result of an async operation **is ready**
   - **Callback hell**: totally such

   ```javascript
      getUser(
         getRepos(
            getBranches(
               getCommits(
                  // stuff need to be done
               )
            )
         )
      )
   ```

   - **Named function** came to rescue =))
   
   ```javascript

      getBranches(repoId, displayBranches); --> Not calling, just passing a reference

      function displayBranches(branches) {
         ...
      }

   ```

   - **Promises** is an object (hold 3 states) - It promises you it will give you the eventual result of an async operation.
      
      - Pending (Kicking off async operations)
      - Fulfilled (when the result is ready - async operation is successfully complete, finally we have **value**)
      - Rejected (Otherwisem if something went wrong, we have an **error**)
      ####

   - **Settled Promises** (stable) - a promise which is already resolved or rejected (static methods)

   ```javascript

      Promise.resolve(...);
      Promise.reject(...);

   ```
   ####
   
   - **Parallel promises** - call different APIs like an example - static methods

   ```javascript
      Promise.all([pFb, pMelOn, pHanteo]) // all completed
      Promise.race([pFb, pMelOn, pHanteo]) // 1st one completed
         .then(data => ...)
         .catch(err => ...) // just 1 in all err => all err
      // results are in an array
   ```

   - **Async /await** 
      ######
      - Make your code ***look like*** async (but actually not)
      - Must use Try-catch block
      - async --> use await operator

   ```javascript
      await getUser(1); // returns a Promise
      const user = await getUser(1)
   ```

## Section 7: CRUD Operations Using Mongoose

## Section 8: Mongo - Data Validation

## Section 9: Mongoose - Modeling Relationships between connected data

## Section 10: Authentication & Authorization

## Section 11: Handling & Logging Errors

## Section 12: Unit Testing

## Section 13: Integration Testing

## Section 14: Test-driven Development

## Section 15: Deployment
