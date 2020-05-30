const { logger } = require('../utils');

const RandomService = require('./Random/Random.Service');
const RandomController = require('./Random/Random.Controller');
const Server = require('./Server');

class App {
  constructor (config) {
    this.config = config;

    this.logger = logger;

    this.RandomService = new RandomService(this, config.random);
    this.RandomController = new RandomController(this, config.random);

    this.server = new Server(this, config.server);
  }

  /**
   * Asynchronously start application
   */
  async start () {
    try {
      await this.server.start();
      this.logger.info('🎉', 'App is now ready and running');
    } catch (err) {
      this.logger.error('❌', 'App crashed!');
      this.logger.stack(err);
      process.exit(1);
    }
  }
}

module.exports = App;
