import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import LogoutButton from '../../../src/modules/common/components/logout-button';

describe('LogoutButton', () => {
  const user = { id: 3, credited_name: 'Bob Ross' };
  const logoutClick = sinon.spy();
  const wrapper = shallow(<LogoutButton user={user} logout={logoutClick} />);

  it('should render a button', () => {
    expect(wrapper.find('button')).to.have.length(1);
  });

  it('should render the user\'s name', () => {
    expect(wrapper.find('span').first().props().children).to.equal(user.credited_name);
  });

  it('should call the specified handler', () => {
    wrapper.find('button').first().simulate('click');
    expect(logoutClick.calledOnce).to.be.true;
  });
});
