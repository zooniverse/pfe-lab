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
  organizations: sampleOrganizations,
};

let organizationsPeek = [];

const MyPureComponent = ({ organizations }) => {
  organizationsPeek = organizations;

  return (<div>okay</div>);
};

describe('OrganizationsContainer', () => {
  const mockStore = configureStore([]);
  const store = mockStore(initialState);

  mount(
    <Provider store={store}>
      <OrganizationsContainer params={{}}>
        <MyPureComponent />
      </OrganizationsContainer>
    </Provider>,
  );

  it('should give ListOrganizations the organizations correctly', () => {
    expect(organizationsPeek).to.have.length(initialState.organizations.length);
    expect(organizationsPeek[0].id).to.equal(initialState.organizations[0].id);
  });
});
