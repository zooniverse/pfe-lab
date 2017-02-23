import { expect } from 'chai';

import initialState from '../../../src/initial-state';

import { organization, organizations, orgAction, ownedOrgsAction, bogusAction } from './test-data';

import reducer from '../../../src/modules/organizations/reducer';

describe('OrganizationsReducer', () => {
  it('should put a new organization into the state on receiving a SET_CURRENT_ORGANIZATION', () => {
    const newState = reducer(initialState, orgAction);

    expect(newState.organization).to.not.be.null;
    expect(newState.organization.id).to.equal(organization.id);
  });

  it('should put a new organization list into the state on receiving a SET_OWNED_ORGANIZATIONS', () => {
    const newState = reducer(initialState, ownedOrgsAction);

    expect(newState.ownedOrganizations).to.not.be.null;
    expect(newState.ownedOrganizations).to.have.length(organizations.length);
    expect(newState.ownedOrganizations[0].id).to.equal(organizations[0].id);
  });

  it('should return only modified fields so our custom reducer can merge changes', () => {
    const orgState = reducer(initialState, orgAction);
    const orgsState = reducer(initialState, ownedOrgsAction);

    expect(orgState.organizations).to.be.undefined;
    expect(orgState.user).to.be.undefined;
    expect(orgState.initialized).to.be.undefined;

    expect(orgsState.organization).to.be.undefined;
    expect(orgsState.user).to.be.undefined;
    expect(orgsState.initialized).to.be.undefined;
  });

  it('should respond to unknown actions with the same state', () => {
    const newState = reducer(initialState, bogusAction);

    expect(newState).to.equal(initialState);
  });
});
