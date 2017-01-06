import React from 'react';
import { Provider } from 'react-redux';

import { mount } from 'enzyme';
import { expect } from 'chai';

import configureStore from 'redux-mock-store';

import { user } from '../users/test-data';
import { organization as sampleOrganization } from './test-data';

import OrganizationContainer from '../../../src/modules/organizations/containers/organization-container';

const initialState = {
  user,
  initialized: true,
  organization: sampleOrganization,
};

let organizationPeek = {};

const MyPureComponent = ({ organization }) => {
  organizationPeek = organization;

  return (<div>okay</div>);
};

describe('OrganizationContainer', () => {
  const mockStore = configureStore([]);
  const store = mockStore(initialState);

  mount(
    <Provider store={store}>
      <OrganizationContainer params={{}}>
        <MyPureComponent />
      </OrganizationContainer>
    </Provider>,
  );

  it('should give EditDetails the organization correctly', () => {
    expect(organizationPeek.id).to.equal(initialState.organization.id);
  });
});
