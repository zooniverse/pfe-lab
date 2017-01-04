import React from 'react';
import { Provider } from 'react-redux';

import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import configureStore from 'redux-mock-store';

import HeaderAuth from '../../../src/modules/common/containers/header-auth';
import initialState from '../../../src/reducers/initial-state';

describe('HeaderAuth', () => {
  const mockStore = configureStore([]);
  const store = mockStore(initialState);

  // const wrapper = mount(
  //   <Provider store={store}>
  //     <HeaderAuth />
  //   </Provider>,
  // );
  //
  it('should have a login button', () => {

  });
});
