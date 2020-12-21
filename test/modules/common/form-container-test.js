import React from 'react';
import sinon from 'sinon';

import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

import FormContainer from '../../../src/modules/common/containers/form-container';

describe('FormContainer', function() {
  let wrapper;
  let onSubmit;
  let onReset;
  before(function() {
    onSubmit = sinon.spy();
    onReset = sinon.spy();
  });

  it('renders children', function() {
    wrapper = shallow(
      <FormContainer onSubmit={onSubmit} onReset={onReset} resetLabel="Reset" submitLabel="Submit">
        <span></span>
      </FormContainer>);
    expect(wrapper.find('span')).to.have.length(1);
  });

  describe('change event', function() {
    before(function() {
      wrapper = shallow(<FormContainer onSubmit={onSubmit} onReset={onReset} resetLabel="Reset" submitLabel="Submit" />);
    });

    it('does not render the buttons without changes', function() {
      expect(wrapper.find('button')).to.have.length(0);
    });

    it('sets show state to true if there are changes', function() {
      wrapper.simulate('change');
      expect(wrapper.state('show')).to.be.true;
    });
  });

  describe('submit button render', function() {
    let submitButton;
    before(function() {
      wrapper = mount(<FormContainer onSubmit={onSubmit} onReset={onReset} resetLabel="Reset" submitLabel="Submit" />);
    });

    beforeEach(function() {
      wrapper.simulate('change');
      submitButton = wrapper.find('button[type="submit"]');
    });

    it('uses submitLabel prop when set', function() {
      expect(submitButton.text()).to.equal('Submit');
    });

    it('is disabled if disabledSubmit prop is true', function() {
      expect(submitButton.prop('disabled')).to.be.false;
      wrapper.setProps({ disabledSubmit: true });
      submitButton = wrapper.find('button[type="submit"]');
      expect(submitButton.prop('disabled')).to.be.true;
    });
  });

  describe('submit button onSubmit event', function() {
    let submitButton;
    before(function() {
      wrapper = shallow(<FormContainer onSubmit={onSubmit} onReset={onReset} resetLabel="Reset" submitLabel="Submit" />);
    });

    beforeEach(function() {
      wrapper.simulate('change');
      submitButton = wrapper.find('button[type="submit"]');
      // to get event.preventDefault to work: https://github.com/airbnb/enzyme/issues/323
      submitButton.simulate('click', { preventDefault: () => undefined });
    });

    it('calls onSubmit once', function() {
      expect(onSubmit.calledOnce).to.be.true;
    });

    it('sets show and submitting state to false after clicking submit', function(done) {
      // Wait for the promise
      setImmediate(() => {
        expect(wrapper.state('submitting')).to.be.false;
        expect(wrapper.state('show')).to.be.false;
        done();
      });
    });
  });

  describe('reset button', function() {
    let resetButton;
    before(function() {
      wrapper = shallow(<FormContainer onSubmit={onSubmit} onReset={onReset} resetLabel="Reset" submitLabel="Submit" />);
    });

    beforeEach(function() {
      wrapper.simulate('change');
      resetButton = wrapper.find('button[type="reset"]');
      resetButton.simulate('click', { preventDefault: () => undefined });
    });

    it('calls onReset once', function() {
      expect(onReset.calledOnce).to.be.true;
    });

    it('sets show and submitting state to false after clicking cancel', function() {
      expect(wrapper.state('submitting')).to.be.false;
      expect(wrapper.state('show')).to.be.false;
    });

    it('uses resetLabel prop when set', function() {
      expect(resetButton.text()).to.equal('Reset');
    });
  });
});
