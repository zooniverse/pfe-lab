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
    wrapper = shallow(
      <FormContainer onSubmit={onSubmit} onReset={onReset} resetLabel="Reset" submitLabel="Submit">
        <span></span>
      </FormContainer>);
  });

  it('renders children', function() {
    expect(wrapper.find('span')).to.have.length(1);
  });

  describe('change event', function() {
    it('does not render the buttons without changes', function() {
      expect(wrapper.find('button')).to.have.length(0);
    });

    it('sets show state to true if there are changes', function() {
      wrapper.simulate('change');
      expect(wrapper.state('show')).to.be.true;
    });
  });

  describe('submit button', function() {
    let submitButton;
    beforeEach(function() {
      wrapper.simulate('change');
      submitButton = wrapper.find('button[type="submit"]');
      // to get event.preventDefault to work: https://github.com/airbnb/enzyme/issues/323
      submitButton.simulate('click', { preventDefault: () => undefined });
    });

    it('calls onSubmit once', function() {
      expect(onSubmit.calledOnce).to.be.true;
    });

    it('sets state to false after clicking submit', function() {
      expect(wrapper.state('show')).to.be.false;
    });

    it('uses submitLabel prop when set', function() {
      expect(submitButton.text()).to.equal('Submit');
    });
  });

  describe('reset button', function() {
    let resetButton;
    beforeEach(function() {
      wrapper.simulate('change');
      resetButton = wrapper.find('button[type="reset"]');
      resetButton.simulate('click', { preventDefault: () => undefined });
    });

    it('calls onReset once', function() {
      expect(onReset.calledOnce).to.be.true;
    });

    it('sets state to false after clicking cancel', function() {
      expect(wrapper.state('show')).to.be.false;
    });

    it('uses resetLabel prop when set', function() {
      expect(resetButton.text()).to.equal('Reset');
    });
  });
});
