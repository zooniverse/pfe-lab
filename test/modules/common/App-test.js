import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import initialState from '../../../src/initial-state';

import App from '../../../src/modules/common/containers/App';


describe('App', () => {
  it('should load the layout and connect it to the redux store', () => {
    const mockStore = configureStore([]);
    const store = mockStore(initialState);

    const wrapper = shallow(<App store={store} />).shallow();
    expect(wrapper.find('Connect(Layout)')).to.have.length(1);
  });
});
