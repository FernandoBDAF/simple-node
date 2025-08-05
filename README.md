# Simple Node

## Overview

This is a very simple, bare-bones NodeJS project that will be used to CI/CD demonstration.

## Local Setup

- Install dependencies: `npm install`
- Run server: `node server.js`

## Testing

This project includes comprehensive unit tests for all functions:

- Run tests: `npm test`
- Run tests in watch mode: `npm run test:watch`

The tests cover:

- `sleep()` function - async timing behavior
- `getRandomInt()` function - random number generation within hardcoded range
- `createMessage()` function - message formatting
- Edge cases and error handling
- Integration testing of function interactions

## Container Setup

- Build image: `docker build .`
- Run container with image: `docker run {image_id}` where `image_id` can be retrieved by running `docker images` and found under the column `IMAGE ID`

## Container teardown

- Remove container: `docker kill {container_id}` where `container_id` can be retrieved by running `docker ps` and found under the column `CONTAINER ID`

- Access container: `docker exec -it {container_id} sh`

## Deploy container to DockerHub

## Create CI with Trevis
