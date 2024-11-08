// server.js

const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.FINNHUBAPIKEY; // Finnhub API Key
// const stockquoteFetchInterval = 5000;
const stockquoteFetchInterval = process.env.SSE_UPDATE_INTERVAL;

const AUTH_API_KEY = process.env.USER_API_KEY;  // Front end API Key

app.get('/quote-stream', async (req, res) => {
    const symbol = req.query.symbol;

    const clientApiKey = req.headers['x-api-key'];

    if (!clientApiKey || clientApiKey !== AUTH_API_KEY) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!symbol) {
        return res.status(400).json({ error: 'Symbol query parameter is required' });
    }

    const quoteUrl = `https://finnhub.io/api/v1/quote?symbol=${symbol}`;

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders(); // flush the headers to establish SSE with the client

    const sendStockQuote = async () => {
        try {
            const response = await axios.get(quoteUrl, {
                headers: {
                    'X-Finnhub-Token': API_KEY
                }
            });

            // const data = JSON.stringify(response.data);
            
            let quoteResponseBody = {
                Price: response.data.c,
                Change: response.data.d,
                ChangePercent: response.data.dp,
                DayHigh: response.data.h,
                DayLow: response.data.l,
                OpenPrice: response.data.o,
                PreviousClose: response.data.pc,
                Symbol: symbol
            }
            //res.write(`data: ${quoteResponseBody}\n\n`); // Send the data as an SSE
            res.write(JSON.stringify(quoteResponseBody));

            // Schedule the next stock quote fetch
            setTimeout(sendStockQuote, stockquoteFetchInterval); // Adjust the interval as needed
        } catch (error) {
            res.write(`data: ${JSON.stringify({ error: 'Failed to fetch stock quote', details: error.message })}\n\n`);
            setTimeout(sendStockQuote, stockquoteFetchInterval); // Retry after a delay in case of an error
        }
    };

    // Start the initial stock quote fetch
    sendStockQuote();

    // Close the connection if the client disconnects
    req.on('close', () => {
        console.log('Client disconnected');
        res.end();
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
