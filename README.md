##User Management Service

A service for managing users, that can like and un-like each other.

Requires a running MongoDB server.

####Scripts
`npm start` to start up the server

`npm run dev` to start up a dev server, which restarts on code changes (using `nodemon`).

`npm test` to run test (using `jest`)

##Code

Code is organized into entities, use-cases, data adapter, and HTTP adapter.

###Dependency injection

Use of any DI framework is avoided and all the injection is done using simple
builder functions.

####Entities

Users and Tokens are entities in this service, holding domain data and high level data
manipulation, like password encryption and token encoding/decoding.

####Use-cases

Use-cases manipulate entities and communicate to data storage adapters to form
application features. They are located in the `./use-cases` directory. Use-cases
have source-code dependency on entities, but adapters are injected as dependencies.
This makes it easier to swap dependencies with others that match the same interface.
For example, when testing use-cases we inject am in-memory user data store for faster
testing.

####Data adapter

All the details of data persistence is abstracted into the data adapter, located in
`./data` directory. This implementation is done using MongoDB with the raw MongoDB
Node.JS driver. Since this service communicates back in plain objects, and it's users
(use-cases) have no knowledge of the implementation, it can easily be swapped for
another type of persistence (SQL, third-party API, raw files, ...), without changing
anything in the use-cases.

####HTTP adapter

All the details of HTTP communication is abstracted into the HTTP adapter, located in 
`./http` directory. This implementation uses Express, and incapsulates all the details
of HTTP (verbs, paths, route params, query params, body parsing, ...). Route callbacks
are organized as controllers. They gather all the input data from HTTP requests,
invoke use-cases, and form the response. The rest of the application had no knowledge
it's being consumed by an HTTP REST API, so it can easily be plugged in a CLI app,
WebSocket server, GraphQL server, Electron desktop app, etc.
