import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import configureStore from 'redux-mock-store';

import { user } from '../../users/test-data';
import { organization, organizations, organizationsAvatars } from '../test-data';
import OrganizationsListContainer from '../../../../src/modules/organizations/containers/organizations-list-container';

const initialState = {
  user,
  initialized: true
};

describe('<OrganizationsListContainer />', () => {
  let wrapper;
  let fetchOrganizationsSpy;
  let fetchLinkedAvatarSpy;
  const mockStore = configureStore([]);
  const store = mockStore(initialState);
  const resolver = value => new Promise(resolve => resolve(value));

  // TODO: trying out rewire for integration testing. It's not working yet.
  // OrganizationsListContainer.__Rewire__('apiClient', {
  //   type: (type) => ({
  //     get: () => {
  //       if (type === 'organizations') {
  //         return resolver(organizations);
  //       } else if (type === 'avatars') {
  //         return resolver(organizationsAvatars);
  //       }
  //     },
  //     create: () => {
  //       if (type === 'organizations') {
  //         return resolver(organization);
  //       }
  //     },
  //     save: () => {}
  //   })
  // });
  before(function() {
    fetchOrganizationsSpy = sinon.spy(OrganizationsListContainer.prototype, 'fetchOrganizations');
    fetchLinkedAvatarSpy = sinon.spy(OrganizationsListContainer.prototype, 'fetchLinkedAvatar');
    wrapper = mount(
      <Provider store={store}>
        <OrganizationsListContainer />
      </Provider>,
    );
  });

  // describe('componentDidMount', function() {
  //   it('calls fetchOrganizations once', function() {
  //     expect(fetchOrganizationsSpy.calledOnce).to.be.true;
  //   });
  // });
});
