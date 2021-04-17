// Get dependencies
var express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();

// Parsers for POST data
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

// Include our routes for the app
require('./routes/routes')(app);

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '4200';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
