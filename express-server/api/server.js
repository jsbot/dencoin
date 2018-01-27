// Get dependencies
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import conf from './conf/dev';
import swaggerUi from 'swagger-ui-express';


export const app = express ();


// Parsers for POST data
app.use (bodyParser.json ());
app.use (bodyParser.urlencoded ({extended:true}));





// Cross Origin middleware
app.use (function (req, res, next) {
	res.header ('Access-Control-Allow-Origin', '*');
	res.header ('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next ();
});


// Get our API routes
require ('./routes') (app);
//const api = ;

//swagger entry Point
let  swaggerDocument = require('swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || conf.port;
app.set ('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer (app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen (port, () => {
	console.warn(`API running on localhost:${port}`);
}

);


