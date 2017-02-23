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
  collaboratorOrganizations: sampleOrganizations,
};

let ownedOrganizationsPeek = [];
let collaboratorOrganizationsPeek = [];

const MyPureComponent = ({ ownedOrganizations, collaboratorOrganizations }) => {
  ownedOrganizationsPeek = ownedOrganizations;
  collaboratorOrganizationsPeek = collaboratorOrganizations;

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
    expect(ownedOrganizationsPeek).to.have.length(initialState.ownedOrganizations.length);
    expect(ownedOrganizationsPeek[0].id).to.equal(initialState.ownedOrganizations[0].id);
    expect(collaboratorOrganizationsPeek).to.have.length(initialState.collaboratorOrganizations.length);
    expect(collaboratorOrganizationsPeek[0].id).to.equal(initialState.collaboratorOrganizations[0].id);
  });
});
