
// "Passing arrow functions (“lambdas”) to Mocha is discouraged" - https://mochajs.org/#arrow-functions
/* eslint prefer-arrow-callback: 0, func-names: 0, 'react/jsx-boolean-value': ['error', 'always'] */
/* global describe, it, before, beforeEach, afterEach, expect, localStorage */

import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import { AdminContainer } from '../../../src/modules/common/containers/admin-container';

const user = {
  id: '34',
  admin: true
};

describe('AdminContainer', function() {
  describe('renders', function() {
    let wrapper;
    before(function() {
      wrapper = shallow(<AdminContainer />);
    });

    it('without crashing', function() {});

    it('null if there is no user', function() {
      expect(wrapper.type()).to.equal(null);
    });

    it('<AdminCheckbox /> if there is a user', function() {
      wrapper.setProps({ user, loginInitialized: true });
      expect(wrapper.find('AdminCheckbox')).to.have.lengthOf(1);
    });
  });

  describe('lifecycle', function() {
    describe('componentDidMount', function() {
      let setAdminStateStub;
      before(function() {
        setAdminStateStub = sinon.stub(AdminContainer.prototype, 'setAdminState').callsFake(() => {});
      });

      after(function() {
        setAdminStateStub.restore();
      });

      it('does not call #setAdminState if localStorage does not contain { adminFlag: true }', function() {
        mount(<AdminContainer user={user} loginInitialized={true} />);
        expect(setAdminStateStub.called).to.equal(false);
      });

      it('calls #setAdminState if localstorage contains { adminFlag: true }', function() {
        localStorage.setItem('adminFlag', true);
        mount(<AdminContainer user={user} loginInitialized={true} />);
        expect(setAdminStateStub.called).to.equal(true);
        expect(setAdminStateStub.calledWith(true)).to.equal(true);
      });
    });

    describe('componentWillReceiveProps', function() {
      let setAdminStateStub;
      before(function() {
        setAdminStateStub = sinon.stub(AdminContainer.prototype, 'setAdminState').callsFake(() => {});
      });

      after(function() {
        setAdminStateStub.restore();
      });

      it('calls #setAdminState if nextProps.admin does not equal props.admin', function() {
        const wrapper = shallow(<AdminContainer user={user} loginInitialized={true} adminMode={false} />);
        expect(setAdminStateStub.called).to.equal(false);
        wrapper.setProps({ adminMode: true });
        expect(setAdminStateStub.called).to.equal(true);
        expect(setAdminStateStub.calledWith(true)).to.equal(true);
      });
    });
  });
});
