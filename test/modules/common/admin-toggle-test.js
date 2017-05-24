import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import AdminToggle from '../../../src/modules/common/components/admin-toggle';

describe('AdminToggle', () => {
  let wrapper;
  const adminClick = sinon.spy();
  before(function() {
    wrapper = shallow(<AdminToggle adminMode={false} toggleAdminMode={adminClick} />);
  });

  it('should render a checkbox input', function() {
    expect(wrapper.find('input')).to.have.length(1);
  });

  it('should call the props.toggleAdminMode handler', function() {
    wrapper.find('input').simulate('change');
    expect(adminClick.calledOnce).to.be.true;
  });

  it('should not be checked when adminMode is false', function() {
    expect(wrapper.find('input').props().checked).to.be.false;
    expect(wrapper.find('label').hasClass('footer-admin-toggle')).to.be.true;
  });

  it('should be checked when adminMode is true', function() {
    wrapper.setProps({ adminMode: true });
    expect(wrapper.find('input').props().checked).to.be.true;
    expect(wrapper.find('label').hasClass('footer-admin-toggle--active')).to.be.true;
  });
});
