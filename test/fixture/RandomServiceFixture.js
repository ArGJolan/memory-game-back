/* global sinon */

class RandomServiceFixture {
  constructor () {
    this.generate = sinon.spy();
  }
}

module.exports = RandomServiceFixture;
