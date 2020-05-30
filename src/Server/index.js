const express = require('express');
const http = require('http');

class Server {
  constructor (app, config) {
    this.app = app;
    this.logger = app.logger;
    this.config = config;
  }

  async start () {
    this.logger.trace('Server.start');

    // Config server
    this.server = express();
    this.server.use(this.httpLogger.bind(this));
    this.server.get('/random/:count', this.app.RandomController.generate.bind(this.app.RandomController));
    // New routes go here

    this.server.use(this.errorHandling.bind(this));

    this.httpServer = http.createServer(this.server);

    return new Promise(resolve => {
      this.httpServer.listen(this.config.port, this.config.host, () => {
        this.logger.info('💻', `Running on http://${this.config.host}:${this.config.port}`);
        resolve();
      });
    });
  }

  /**
   * Error handler for express
   *
   * @param {Error} err - Error thrown
   * @param {Object} req - express req object
   * @param {Object} res - express res object
   * @param {Function} next - express next middleware
   */
  errorHandling (err, req, res, next) {
    if (!err.status) {
      err.status = 400;
    }
    res.status(err.status);
    res.json({ error: err.message });
    this.logger.error(err.message);
    this.logger.stack(err.stack);
  }

  /**
   * Http logger for express
   *
   * @param {Object} req - express req object
   * @param {Object} res - express res object
   * @param {Function} next - express next middleware
   */
  httpLogger (req, res, next) {
    this.logger.info('💻', req.method, req.originalUrl, 'from', req.ip);
    next();
  }
}

module.exports = Server;
