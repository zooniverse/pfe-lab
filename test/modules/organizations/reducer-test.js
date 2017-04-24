import { expect } from 'chai';

import initialState from '../../../src/initial-state';

import { organization, organizations, setCurrentOrganizationAction, setOwnedOrganizationsAction, bogusAction } from './test-data';

import reducer from '../../../src/modules/organizations/reducer';

describe('OrganizationsReducer', () => {
  it('should put a new organization into the state on receiving a SET_CURRENT_ORGANIZATION', () => {
    const newState = reducer(initialState, setCurrentOrganizationAction);

    expect(newState.organization).to.not.be.null;
    expect(newState.organization.id).to.equal(organization.id);
  });

  it('should put a new organization list into the state on receiving a SET_OWNED_ORGANIZATIONS', () => {
    const newState = reducer(initialState, setOwnedOrganizationsAction);

    expect(newState.ownedOrganizations).to.not.be.null;
    expect(newState.ownedOrganizations).to.have.length(organizations.length);
    expect(newState.ownedOrganizations[0].id).to.equal(organizations[0].id);
  });

  it('should return only modified fields so our custom reducer can merge changes', () => {
    const currentOrganizationState = reducer(initialState, setCurrentOrganizationAction);
    const ownedOrganizationsState = reducer(initialState, setOwnedOrganizationsAction);

    expect(currentOrganizationState.organizations).to.be.undefined;
    expect(currentOrganizationState.user).to.be.undefined;
    expect(currentOrganizationState.initialized).to.be.undefined;

    expect(ownedOrganizationsState.organization).to.be.undefined;
    expect(ownedOrganizationsState.user).to.be.undefined;
    expect(ownedOrganizationsState.initialized).to.be.undefined;
  });

  it('should respond to unknown actions with the same state', () => {
    const newState = reducer(initialState, bogusAction);

    expect(newState).to.equal(initialState);
  });
});
