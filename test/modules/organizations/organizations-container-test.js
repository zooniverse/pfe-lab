import React from 'react';
import { Provider } from 'react-redux';

import { mount } from 'enzyme';
import { expect } from 'chai';

import configureStore from 'redux-mock-store';

import OrganizationsContainer from '../../../src/modules/organizations/containers/organizations-container';

const initialState = {
  user: {
    id: '3',
    display_name: 'bob_ross',
  },
  initialized: true,
  organizations: [
    {
      id: '7',
      display_name: 'Test Organization',
      description: 'blah blah blah blah',
    },
    {
      id: '42',
      display_name: 'Deep Thought',
      description: 'Probably wrong about everything',
    },
  ],
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
