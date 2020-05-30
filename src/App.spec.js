/* global expect */
/* eslint-disable no-unused-expressions */

const proxyquire = require('proxyquire');

const { EmptyFixture, ServerFixture, UtilsFixture } = require('../test/fixture');

const App = proxyquire('./App', {
  './Random/Random.Service': EmptyFixture,
  './Random/Random.Controller': EmptyFixture,
  './Server': ServerFixture,
  '../utils': UtilsFixture,
});

describe('App', () => {
  let app;

  beforeEach(() => {
    app = new App({
      random: {},
      server: {},
    });
  });

  it('should call server start', async () => {
    await app.start();
    expect(app.server.start).to.have.been.called;
  });
});
