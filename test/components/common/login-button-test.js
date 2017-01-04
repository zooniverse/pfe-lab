import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import LoginButton from '../../../src/modules/common/components/login-button';

describe('LogoutButton', () => {
  const loginClick = sinon.spy();
  const wrapper = shallow(<LoginButton login={loginClick} />);

  it('should render a button', () => {
    expect(wrapper.find('button')).to.have.length(1);
  });

  it('should call the specified handler', () => {
    wrapper.find('button').first().simulate('click');
    expect(loginClick.calledOnce).to.be.true;
  });
});
