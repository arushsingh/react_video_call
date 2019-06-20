process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const express = require('express');
const { createServer } = require('http');
const socket = require('./socket');
const https = require('https');
const fs = require('fs');
const cors = require('cors');

const options = {
  key: fs.readFileSync("server.key"),
  cert: fs.readFileSync("server.cert"),
  requestCert: false,
  rejectUnauthorized: false
};

const app = express();
const server = https.createServer(options,app);

app.use('/test', (req, res) => res.send("working"));
app.use('/', express.static(`${process.cwd()}/../client`));

module.exports.run = (config) => { server.listen(5000); socket(server); console.log(`Server is listening at :${5000}`)};