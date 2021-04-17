var express = require('express');

module.exports = (app) => {
    const apiRouter = express.Router();

    app.use('/api', apiRouter);

    require('./breach-routes')(apiRouter);
}
