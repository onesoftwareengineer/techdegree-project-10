'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
// importing body parser for parsing incoming json's
const bodyParser = require('body-parser');
// importing api routes
const apiRoutes = require('./routes');
//importing sequelize database object
const db = require('./db');
//importing CORS
const cors = require('cors');
//importing info's about available routes
const message = require('./routes/info');


// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();

//enable all cors requests
app.use(cors());

// setup morgan which gives us http request logging
app.use(morgan('dev'));

// parse incoming json to req.body
app.use(bodyParser.json());

// handle api routes
app.use('/api', apiRoutes);

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.send(message);
});

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

// authenticating to database and if successful start listening to port
(async () => {
  try {
    //await db.sequelize.authenticate();
    await db.sequelize.sync();
    console.log('Database connection is successfully opened');
    // start listening on our port
    const server = app.listen(app.get('port'), () => {
      console.log(`Express server is listening on port ${server.address().port}`);
    });
  } catch (error) {
    console.log("Ups, there’s an error connecting to the database", error);
  }
})();