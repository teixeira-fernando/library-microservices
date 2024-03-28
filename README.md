WIP

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=teixeira-fernando_library-microservices&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=teixeira-fernando_library-microservices)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=teixeira-fernando_library-microservices&metric=bugs)](https://sonarcloud.io/summary/new_code?id=teixeira-fernando_library-microservices)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=teixeira-fernando_library-microservices&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=teixeira-fernando_library-microservices)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=teixeira-fernando_library-microservices&metric=coverage)](https://sonarcloud.io/summary/new_code?id=teixeira-fernando_library-microservices)

# Library-microservices
Library management application in Node.js, setting up different layers of test automation to cover the application microservices and at the same time, exercising some best practices from javascript.


## Tech stack

* Node.js
* Javascript
* Mongo.DB
* Jest
* Test Containers
* Super Test
* Docker-compose
* Kubernetes

## How to run it:

1. The easier option is to use docker-compose. You can simply run the command:

    ``` docker-compose up -d ```

2. The second option is to run it using kubernetes. There is a full documentation on to do it in the following link:

    [Running the project with kubernetes](/kubernetes/README.md)



## CI/CD configuration

We have pipelines configured for each one of the microservices, where we run different kinds of tests and other checks.

There is also another pipeline configured with SonarQube where it is checked code quality, security, test coverage, etc.