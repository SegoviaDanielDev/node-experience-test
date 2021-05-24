<p align="center">  
  <a href="https://github.com/DigiChanges/node-experience" target="blank"><img src="./NExp.svg" width="120" alt="NExp logo" /></a>  
</p>  

Hello! **NExp** *(Node Experience)* is a boilerplate for [**Node**](https://nodejs.org/en/) built on [**Express**](https://expressjs.com/), which makes use of a Hexagonal architecture, in addition to all the power of [**TypeScript**](https://www.typescriptlang.org/); that combined allow a perfect cohesion thus achieving a clean and at the same time very powerful implementation.

**Folder structure of a module**

```sh 
├── Domain
│   ├── Entities
│   ├── Exceptions
│   └── UseCases
├── Infrastructure
│   ├── Repositories
│   ├── Schema
│   └── Seeds
├── InterfaceAdapters
│   └── Payloads
├── Presentation
│   ├── Commands
│   ├── Criterias
│   ├── Exceptions
│   ├── Handlers
│   ├── Middlewares
│   ├── Requests
│   └── Transformers
├── Services
├── Shared
└── Tests
 ```

```mermaid
sequenceDiagram
participant C as Client 
participant S as Server

C--)S: Request
activate S

S--)C: Response
deactivate S
```

```mermaid
sequenceDiagram
participant C as Client 
participant P as Presentation 
participant D as Domain
participant I as Infrastructure

C--)P: Request
activate P

P-)D: Payload
activate D

D-)I: IDomain
activate I

I-)D: IDomain
deactivate I

D-)P: IDomain
deactivate D

P--)C: Response 
deactivate P

```

## Optimized Transpilation

There is a hot reloading using bash and git files. With this mechanism we can transpile only the files that are necessary to transpile, in addition there are also files to take care of eliminating the transpiled files
that they are not in the project in case of deleting them, when that happens, as nodemon is used for the refresh, in the
case of the remove files does not restart and in that specific case it should be restarted manually. Although in the
normal development process. It would not be necessary since eventually you would be modifying another file and it
would automatically transpile that file and delete the file that was deleted.

As it is still in the experimentation phase, the process may fail. In the event of failure, you can choose to manually
compile the file that failed to compile or directly execute ```yarn tsc``` to compile everything again.

## Commands
**NExp** has a series of commands per console that allow you to perform certain actions, from creating a user and assigning a role, to creating a bucket or synchronizing the permissions to the roles defined directly in the code. [Available commands](./Docs/Commands.md)

## Tools

**NExp** uses a number of open source packages to work properly:

* [axios](https://www.npmjs.com/package/axios) - Promise based HTTP client for the browser and node.js.

* [bcrypt](https://www.npmjs.com/package/bcrypt) - A library to help you hash passwords.

* [bcryptjs](https://www.npmjs.com/package/bcryptjs) - Optimized bcrypt in JavaScript with zero dependencies.

* [catch-decorator](https://www.npmjs.com/package/catch-decorator) - Allows you to handle exceptions in class methods with only one annotation (decorator).

* [class-validator](https://www.npmjs.com/package/class-validator) - Allows use of decorator and non-decorator based validation. Internally uses validator.js to perform validation. Class-validator works on both browser and node.js platforms.

* [commander](https://www.npmjs.com/package/commander) - The complete solution for node.js command-line interfaces.

* [compression](https://www.npmjs.com/package/compression) - Node.js compression middleware.

* [config](https://www.npmjs.com/package/config) - Node-config organizes hierarchical configurations for your app deployments.

* [cors](https://www.npmjs.com/package/cors) - CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.

* [cpy-cli](https://www.npmjs.com/package/cpy-cli) - Copy Files.

* [dotenv](https://www.npmjs.com/package/dotenv) - Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.

* [envalid](https://www.npmjs.com/package/envalid) - Envalid is a small library for validating and accessing environment variables in Node.js.

* [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import) - This plugin intends to support linting of ES2015+ (ES6+) import/export syntax, and prevent issues with misspelling of file paths and import names. All the goodness that the ES2015+ static module syntax intends to provide, marked up in your editor.

* [eslint-plugin-prefer-arrow](https://www.npmjs.com/package/eslint-plugin-prefer-arrow) - ESLint plugin to prefer arrow functions. By default, the plugin allows usage of function as a member of an Object's prototype, but this can be changed with the property disallowPrototype. Functions referencing this will also be allowed. Alternatively, with the singleReturnOnly option, this plugin only reports functions where converting to an arrow function would dramatically simplify the code.

* [express](https://www.npmjs.com/package/express) - Fast, unopinionated, minimalist web framework for node.

* [express-handlebars](https://www.npmjs.com/package/express-handlebars) - A Handlebars view engine for Express which doesn't suck.

* [express-rate-limit](https://www.npmjs.com/package/express-rate-limit) - Basic rate-limiting middleware for Express. Use to limit repeated requests to public APIs and/or endpoints such as password reset.

* [express-throttle](https://www.npmjs.com/package/express-throttle) - Request throttling middleware for Express framework.

* [express-winston](https://www.npmjs.com/package/express-winston) - Winston middleware for express.js.

* [faker](https://www.npmjs.com/package/faker) - Generate massive amounts of fake data in the browser and node.js.

* [handlebars](https://www.npmjs.com/package/handlebars) - Handlebars.js is an extension to the Mustache templating language created by Chris Wanstrath.

* [helmet](https://www.npmjs.com/package/helmet) - Helmet helps you secure your Express apps by setting various HTTP headers.

* [husky](https://www.npmjs.com/package/husky) - Modern native Git hooks made easy.

* [i18n](https://www.npmjs.com/package/i18n) - Lightweight simple translation module with dynamic JSON storage.

* [inversify](https://www.npmjs.com/package/inversify) - A powerful and lightweight inversion of control container for JavaScript & Node.js apps powered by TypeScript.

* [inversify-express-utils](https://www.npmjs.com/package/inversify-express-utils) - Some utilities for the development of express applications with Inversify.

* [inversify-inject-decorators](https://www.npmjs.com/package/inversify-inject-decorators) - Lazy evaluated property injection decorators.

* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - An implementation of JSON Web Tokens.

* [jwt-simple](https://www.npmjs.com/package/jwt-simple) - JWT(JSON Web Token) encode and decode module for node.js.

* [lodash](https://www.npmjs.com/package/lodash) - The Lodash library exported as Node.js modules.

* [md5](https://www.npmjs.com/package/md5) - A JavaScript function for hashing messages with MD5.

* [minio](https://www.npmjs.com/package/minio) - The MinIO JavaScript Client SDK provides simple APIs to access any Amazon S3 compatible object storage server.

* [moment](https://www.npmjs.com/package/moment) - A JavaScript date library for parsing, validating, manipulating, and formatting dates.

* [mongodb](https://www.npmjs.com/package/mongodb) - The official MongoDB driver for Node.js.

* [mongoose](https://www.npmjs.com/package/mongoose) - Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.

* [multer](https://www.npmjs.com/package/multer) - Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.

* [node-minio](https://www.npmjs.com/package/node-minio) - Async Minio(S3 compatible high performance object storage and retrieval) client for promises support in NodeJS An helper library which provides core promisified helper functions for using minio bucket from Node API.

* [nodemailer](https://www.npmjs.com/package/nodemailer) - Sponsored by Forward Email – free email forwarding + custom domains + 100% open-source!

* [pg](https://www.npmjs.com/package/pg) - Non-blocking PostgreSQL client for Node.js.

* [pg-promise](https://www.npmjs.com/package/pg-promise) - PostgreSQL interface for Node.js.

* [reflect-metadata](https://www.npmjs.com/package/reflect-metadata) - Proposal to add Metadata to ECMAScript.

* [tedis](https://www.npmjs.com/package/tedis) - Tedis write with typescript, it's the client of redis for nodejs, support async with ts and commonjs.

* [ts-jest](https://www.npmjs.com/package/ts-jest) - A TypeScript preprocessor with source map support for Jest that lets you use Jest to test projects written in TypeScript.

* [typeorm](https://www.npmjs.com/package/typeorm) - TypeORM is an ORM that can run in NodeJS, Browser, Cordova, PhoneGap, Ionic, React Native, NativeScript, Expo, and Electron platforms and can be used with TypeScript and JavaScript (ES5, ES6, ES7, ES8). Its goal is to always support the latest JavaScript features and provide additional features that help you to develop any kind of application that uses databases - from small applications with a few tables to large scale enterprise applications with multiple databases.

* [uuid](https://www.npmjs.com/package/uuid) - For the creation of RFC4122 UUIDs.

* [web-push](https://www.npmjs.com/package/web-push) - Web push requires that push messages triggered from a backend be done via the Web Push Protocol and if you want to send data with your push message, you must also encrypt that data according to the Message Encryption for Web Push spec.

* [winston](https://www.npmjs.com/package/winston) - A logger for just about everything.

## License

**NExp** is [MIT licensed](LICENSE).