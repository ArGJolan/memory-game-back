/* global expect sinon */
/* eslint-disable no-unused-expressions */

const { RandomServiceFixture, UtilsFixture } = require('../../test/fixture');
const RandomController = require('./Random.Controller');
const { AssertionError } = require('assert');

describe('RandomController', () => {
  let randomController;
  let nextSpy;
  let mockRes;

  const app = {
    RandomService: new RandomServiceFixture(),
    logger: UtilsFixture.logger,
  };
  const config = {
    min: 42,
    max: 84,
  };
  beforeEach(() => {
    nextSpy = sinon.spy();
    mockRes = { json: sinon.spy() };
    randomController = new RandomController(app, config);
  });

  it('should throw when a non number is sent', () => {
    expect(nextSpy).to.not.have.been.called;

    randomController.generate({ params: { count: 'toto' } }, mockRes, nextSpy);
    expect(mockRes.json).to.not.have.been.called;
    expect(nextSpy).to.have.been.called;
    expect(nextSpy).to.have.property('args');
    expect(nextSpy.args).to.be.an('array').that.have.a.lengthOf(1);
    expect(nextSpy.args[0][0] instanceof AssertionError).to.be.true;
    expect(nextSpy.args[0][0].message).to.eq('You must provide a number');
  });

  it('should throw when a negative number is sent', () => {
    expect(nextSpy).to.not.have.been.called;

    randomController.generate({ params: { count: '-42' } }, mockRes, nextSpy);
    expect(mockRes.json).to.not.have.been.called;
    expect(nextSpy).to.have.been.called;
    expect(nextSpy).to.have.property('args');
    expect(nextSpy.args).to.be.an('array').that.have.a.lengthOf(1);
    expect(nextSpy.args[0][0] instanceof AssertionError).to.be.true;
    expect(nextSpy.args[0][0].message).to.eq('You must provide a positive number');
  });

  it('should throw when too many numbers are requested', () => {
    expect(nextSpy).to.not.have.been.called;

    randomController.generate({ params: { count: '4200' } }, mockRes, nextSpy);
    expect(mockRes.json).to.not.have.been.called;
    expect(nextSpy).to.have.been.called;
    expect(nextSpy).to.have.property('args');
    expect(nextSpy.args).to.be.an('array').that.have.a.lengthOf(1);
    expect(nextSpy.args[0][0] instanceof AssertionError).to.be.true;
    expect(nextSpy.args[0][0].message).to.eq('It\'s impossible to generate 4200 numbers between 42 and 84');
  });

  it('should call RandomService.generate with valid input', () => {
    expect(app.RandomService.generate).to.not.have.been.called;

    randomController.generate({ params: { count: '14' } }, mockRes, nextSpy);
    expect(app.RandomService.generate).to.have.been.calledWith(14);
    expect(mockRes.json).to.have.been.called;
  });
});
