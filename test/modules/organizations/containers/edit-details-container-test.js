import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import configureStore from 'redux-mock-store';

import { user } from '../../users/test-data';
import { organization, organizationAvatar, organizationBackground } from '../test-data';

import EditDetailsContainer from '../../../../src/modules/organizations/containers/edit-details-container';

const mockStore = configureStore([]);

describe('<EditDetailsContainer />', function() {
  let wrapper;
  const initialState = {
    user,
    initialized: true,
    organization,
    organizationAvatar,
    organizationBackground
  };
  const store = mockStore(initialState);

  before(function() {
    wrapper = mount(
      <Provider store={store}>
        <EditDetailsContainer />
      </Provider>);
  });

  it('mounts', function() {
    expect(wrapper.find(EditDetailsContainer)).to.have.lengthOf(1);
  });
});
