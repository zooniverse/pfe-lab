import React from 'react';
import { Provider } from 'react-redux';

import { mount } from 'enzyme';
import { expect } from 'chai';

import configureStore from 'redux-mock-store';

import { user } from '../../users/test-data';
import { organization as sampleOrganization } from '../test-data';

import OrganizationContainer from '../../../../src/modules/organizations/containers/organization-container';

const initialState = {
  user,
  initialized: true,
  organization: sampleOrganization,
};

let organizationIdPeek = '';
let deletionInProgressPeek;

function MyPureComponent({ organizationId, deletionInProgress }) {
  organizationIdPeek = organizationId;
  deletionInProgressPeek = deletionInProgress;

  return (<div>okay</div>);
}

describe('OrganizationContainer', () => {
  const mockStore = configureStore([]);
  const store = mockStore(initialState);

  mount(
    <Provider store={store}>
      <OrganizationContainer params={{ id: '7' }}>
        <MyPureComponent />
      </OrganizationContainer>
    </Provider>,
  );

  it('should give a child component the correct organization Id', () => {
    expect(organizationIdPeek).to.equal('7');
  });

  it('should give a child component the correct deletion state', () => {
    expect(deletionInProgressPeek).to.equal(false);
  });
});
