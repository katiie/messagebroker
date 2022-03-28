# Messagebroker
A node project that behaves like a message broker. This repo also has a consumer and producer project to test the message broker.

There are three projects in this repo:
1)  The messagebroker project that brokers messages. It exposes two api:
     -  subscribe: A get method that requires the topic name as a route parameter
     -  publish: A post method with json payload:  `{
      "topic": "topic name",
      "message": "any value"
     }`
     ![Design Diagram](https://github.com/katiie/messagebroker/blob/development/messagebroker.png)
2)  The consumer project to test the messagebroker `subscribe` endpoint
3)  The publisher project to test the messagebroker `publish` enpoint

To run the messagebroker project:
1)  clone the app
2)  duplicate `test` file in config folder and rename it to `default.config`
3)  Create an .env file and DB_MONGODBURL and DB_DATABASENAME with values specified
4)  run `npm install` on your cli to install the necessary packages
5)  run `npm run start` to start the server
6)  happy testing

To run the producer project:
1)  run `npm install` on your cli to install the necessary packages
2)  start the messagebroker and take note of the url it's running on
3)  replace the endpoint in `default.config` with the messagebroker endpoint
4)  run `npm run start` to start the server 
5)  the code is configured to produce some messages to some default topics

To run the consumer project:
1)  run `npm install` on your cli to install the necessary packages
2)  start the messagebroker and take note of the url it's running on
3)  replace the endpoint in `default.config` with the messagebroker endpoint
4)  run `npm run start` to start the server 
5)  the code is configured to consume some messages from some default topics
