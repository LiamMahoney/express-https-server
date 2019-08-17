const express = require('express');
const path = require('path');
const http = require("http");
const https = require('https');
const querystring = require('querystring');
const winston = require('winston');
const fs = require('fs');

const logger = winston.createLogger({
    level: "info",
    transports: [new winston.transports.File({ filename: './logs/app.log' })],
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    )
});

const app = express();

const credentails = {
    key: fs.readFileSync(process.env.SERVER_KEY, "utf-8"),
    cert: fs.readFileSync(process.env.SERVER_CERT, "utf-8"),
    ca: fs.readFileSync(process.env.SERVER_CHAIN, "utf8")
}

// PUT APIs in here

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentails, app);

httpServer.listen(80, () => {
    console.log("HTTP on port 80");
});

httpsServer.listen(443, () => {
    console.log("HTTPS on port 443");
});