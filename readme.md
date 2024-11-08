# Server Side Event Stock Quote API

A sample SSE API for a stock quote API using [Finnhub](https://finnhub.io/) Stock Quote API.

* Check out code
* Install dependencies
    ```bash
    npm install
    ```
* Set environment variables (e.g. .env) as follows:
    ```
    FINNHUBAPIKEY={{YOUR FINNHUB API KEY}}
    PORT={{PORT FOR YOUR SERVICE}}
    USER_API_KEY={{FRONT END API KEY}}
    SSE_UPDATE_INTERVAL={{DESIRED UPDATE INTERVAL}}
    ```
* Run using:
    ```bash
    node server.js
    ```
* Call API using curl:
    ```bash
    curl -N -H "x-api-key: {{YOUR FRONT END API KEY}}" -H "Accept: text/event-stream" "http://localhost:3000/quote-stream?symbol=AAPL"
    ```
* Expect response as follows:
    ```bash
    {"Price":227.345,"Change":-0.135,"ChangePercent":-0.0593,"DayHigh":228.66,"DayLow":226.405,"OpenPrice":227.58,"PreviousClose":227.48,"Symbol":"AAPL"}
    ```