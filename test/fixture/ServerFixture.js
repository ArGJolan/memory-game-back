const sinon = require('sinon');

class ServerFixture {
  constructor () {
    this.start = sinon.stub();
  }
}

module.exports = ServerFixture;
