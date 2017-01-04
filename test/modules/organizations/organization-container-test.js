import React from 'react';
import { Provider } from 'react-redux';

import { mount } from 'enzyme';
import { expect } from 'chai';

import configureStore from 'redux-mock-store';

import OrganizationContainer from '../../../src/modules/organizations/containers/organization-container';
import EditDetails from '../../../src/modules/organizations/components/edit-details';

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

describe('OrganizationContainer', () => {
  const mockStore = configureStore([]);
  const store = mockStore(initialState);

  const wrapper = mount(
    <Provider store={store}>
      <OrganizationContainer params={{}}>
        <EditDetails />
      </OrganizationContainer>
    </Provider>,
  );

  it('should give EditDetails the organization correctly', () => {
    expect(wrapper.find('h2').first().props().children).to.equal(initialState.organization.display_name);
  });
});
