import React from 'react';
import { Provider } from 'react-redux';

import { mount } from 'enzyme';
import { expect } from 'chai';

import configureStore from 'redux-mock-store';

import OrganizationContainer from '../../../src/modules/organizations/containers/organization-container';

const initialState = {
  user: {
    id: '3',
    display_name: 'bob_ross',
  },
  initialized: true,
  organization: {
    id: '7',
    display_name: 'Test Organization',
    description: 'blah blah blah blah',
  },
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
