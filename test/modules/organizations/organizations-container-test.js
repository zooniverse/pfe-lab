import React from 'react';
import { Provider } from 'react-redux';

import { mount } from 'enzyme';
import { expect } from 'chai';

import configureStore from 'redux-mock-store';

import { user } from '../users/test-data';
import { organizations as sampleOrganizations } from './test-data';

import OrganizationsContainer from '../../../src/modules/organizations/containers/organizations-container';

const initialState = {
  user,
  initialized: true,
  ownedOrganizations: sampleOrganizations,
  collaboratedOrganizations: sampleOrganizations,
};

describe('OrganizationsContainer', () => {
  const mockStore = configureStore([]);
  const store = mockStore(initialState);

  const wrapper = mount(
    <Provider store={store}>
      <OrganizationsContainer />
    </Provider>,
  );

  // it('should give ListOrganizations the organizations correctly', () => {
  // });
});
