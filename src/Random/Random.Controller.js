const assert = require('assert');

class RandomController {
  constructor (app, config) {
    this.app = app;
    this.logger = app.logger;
    this.config = config;

    assert(typeof this.config.min === 'number', 'config.random.min must be a number');
    assert(typeof this.config.max === 'number', 'config.random.max must be a number');
    assert(this.config.max >= this.config.min, 'config.random.max should be bigger than config.random.min');
  }

  /**
   * Control parametters and generate an array of unique random numbers
   *
   * @param {Error} err - Error thrown
   * @param {Object} req - express req object
   * @param {Object} res - express res object
   * @param {Function} next - express next middleware
   */
  generate (req, res, next) {
    this.logger.trace('RandomController.generate');

    try {
      const count = Number(req.params.count);
      assert(!isNaN(count), 'You must provide a number');
      assert(count > 0, 'You must provide a positive number');
      assert(count <= this.config.max - this.config.min + 1, `It's impossible to generate ${count} numbers between ${this.config.min} and ${this.config.max}`);

      const result = this.app.RandomService.generate(count);
      res.json({ result });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = RandomController;
