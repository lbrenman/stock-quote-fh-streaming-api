# Server Side Event Stock Quote API

A sample SSE API for a stock quote API using Finnhub Stock Quote API.

Run using:
```bash
node server.js
```

Call API using curl:
```bash
curl -N -H "Accept: text/event-stream" "http://localhost:3000/quote-stream?symbol=AAPL"
```