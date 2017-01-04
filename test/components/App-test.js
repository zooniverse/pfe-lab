// import React from 'react';
import { expect } from 'chai';
// import TestUtils from 'react-addons-test-utils';
import App from '../../src/modules/common/containers/App';


describe('App', () => {
  // this test is no longer relevant because a shallow render produces
  // child components

  // const shallowRenderer = TestUtils.createRenderer();
  // shallowRenderer.render(<App />); // eslint-disable-line react/jsx-filename-extension
  // const app = shallowRenderer.getRenderOutput();
  // it('should have a div as container', () => {
  //   expect(app.type).to.equal('div');
  // });

  it('should return something', () => {
    const returnSomething = App.prototype.returnSomething('hello!');

    expect(returnSomething).to.be.equal('hello!');
  });
});
