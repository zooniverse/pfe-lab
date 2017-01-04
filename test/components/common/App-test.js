import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import App from '../../../src/modules/common/containers/App';


describe('App', () => {
  it('should load the layout and connect it to the redux store', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('Connect(Layout)')).to.have.length(1);
  });
});
