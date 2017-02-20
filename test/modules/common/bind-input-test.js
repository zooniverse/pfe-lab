import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

import bindInput from '../../../src/modules/common/containers/bind-input';

describe('bindInput', function() {
  let Input;
  before(function() {
    Input = bindInput('value', <input type="text" />);
  });

  it('renders an input', function() {
    const wrapper = shallow(<Input type="text" />);
    expect(wrapper.find('input')).to.have.length(1);
  });

  describe('updates state onChange', function() {
    it('only updates value for text type', function() {
      const wrapper = mount(<Input type="text" />);
      expect(wrapper.state('value')).to.equal('value');
      expect(wrapper.state('checked')).to.equal(false);

      wrapper.find('input').simulate('change', { target: { value: 'new value' } });
      expect(wrapper.state('value')).to.equal('new value');
      expect(wrapper.state('checked')).to.equal(false);
    });

    it('only updates checked for checkbox type', function() {
      Input = bindInput(false, <input type="checkbox" value="collaborator" />);
      const wrapper = mount(<Input type="checkbox" />);
      expect(wrapper.state('value')).to.equal(null);
      expect(wrapper.state('checked')).to.equal(false);

      wrapper.find('input').simulate('change', { target: { checked: true } });
      expect(wrapper.state('value')).to.equal(null);
      expect(wrapper.state('checked')).to.equal(true);
    });
  });
});
