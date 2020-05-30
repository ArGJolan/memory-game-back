class RandomService {
  constructor (app, config) {
    this.app = app;
    this.logger = app.logger;
    this.config = config;
  }

  /**
   * Generate an array of unique random numbers
   *
   * @param {Number} count - Amount of number to generate
   */
  generate (count) {
    this.logger.trace('RandomService.generate');

    const values = [];
    const { min, max } = this.config;

    while (values.length !== count) {
      // Generate a random value between min and max included
      const newValue = Math.floor(min + Math.random() * (1 + max - min));

      if (!values.includes(newValue)) {
        values.push(newValue);
      }
    }

    return values;
  }
}

module.exports = RandomService;
