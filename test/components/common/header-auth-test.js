import React from 'react';
import { Provider } from 'react-redux';

import { mount } from 'enzyme';
import { expect } from 'chai';

import configureStore from 'redux-mock-store';

import HeaderAuth from '../../../src/modules/common/containers/header-auth';
import initialState from '../../../src/reducers/initial-state';
import * as actionTypes from '../../../src/constants/action-types';

describe('HeaderAuth', () => {
  it('should have a login button when nobody is logged in', () => {
    const mockStore = configureStore([]);
    const store = mockStore(initialState);

    const wrapper = mount(
      <Provider store={store}>
        <HeaderAuth />
      </Provider>,
    );

    expect(wrapper.find('button')).to.have.length(1);
    expect(wrapper.find('button').first().props().children).to.equal('Login');
  });

  it('should have a log out button when someone is logged in', () => {
    const mockStore = configureStore([]);
    const loggedInState = Object.assign({}, initialState, {
      initialized: true,
      user: {
        id: 3,
        name: 'bob_ross',
        display_name: 'bob_ross',
        credited_name: 'Bob Ross',
      },
    });
    const store = mockStore(loggedInState);

    const wrapper = mount(
      <Provider store={store}>
        <HeaderAuth />
      </Provider>,
    );

    expect(wrapper.find('button')).to.have.length(1);
    expect(wrapper.find('button').first().props().children).to.equal('Log out');
  });

  it('should log out correctly', () => {
    const mockStore = configureStore([]);
    const loggedInState = Object.assign({}, initialState, {
      initialized: true,
      user: {
        id: 3,
        name: 'bob_ross',
        display_name: 'bob_ross',
        credited_name: 'Bob Ross',
      },
    });
    const store = mockStore(loggedInState);

    const wrapper = mount(
      <Provider store={store}>
        <HeaderAuth />
      </Provider>,
    );

    wrapper.find('button').first().simulate('click');
    const actions = store.getActions();

    expect(actions).to.have.length(1);
    expect(actions[0].type).to.equal(actionTypes.SET_LOGIN_USER);
  });
});
