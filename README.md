# deal-and-detect.js
Deals a poker hand through [Deck of Cards API](http://deckofcardsapi.com/) and detects the winning combo (WIP - quick coding session).

## Installation
A simple `npm install`.

## Build and run
Build through `npm run build` (or `npm run build:dev` for dev purposes). Then you can serve the built application from the `/dist` directory via `http-server` (for instance).

## Debug mode
To test a specific detection strategies, it is possible to invoke a specific hand via query parameters, e.g.
```
http://localhost:9000?debug=AS,5C,3H,0D,KS
```
where each card is identifed with this pattern: `[value][suit]`. You can refer to the documentation of [Deck of Cards API](http://deckofcardsapi.com/), towards which the value of the query parameter is actually forwarded. 

## Design
This small piece of software is written in pure ES6 and makes use of the [Web Workers API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers#Web_Workers_API), [CustomEvent API](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) and [ReactJS](https://reactjs.org).

Once a hand is dealt, it is sent through the full pipe of detection strategies  - `Detector` instances which control the detection workers. Each type of poker combination is associated with one detection strategy/worker.

Each detection worker checks the poker hand against a validation algorithm for the hand to be identifed as this or that type of poker combination. As soon as all the workers publish their response - the main thread is then solely in charge of deciding what the winning combination is - if more than one get detected - based on the rank.

`Last updated: Nov 1, 2019`
