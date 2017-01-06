import { expect } from 'chai';

import initialState from '../../../src/initial-state';

import { organization, organizations, orgAction, orgsAction, bogusAction } from './test-data';

import reducer from '../../../src/modules/organizations/reducer';

describe('OrganizationsReducer', () => {
  it('should put a new organization into the state on receiving a SET_CURRENT_ORGANIZATION', () => {
    const newState = reducer(initialState, orgAction);

    expect(newState.organization).to.not.be.null;
    expect(newState.organization.id).to.equal(organization.id);
  });

  it('should put a new organization list into the state on receiving a SET_ORGANIZATIONS', () => {
    const newState = reducer(initialState, orgsAction);

    expect(newState.organizations).to.not.be.null;
    expect(newState.organizations).to.have.length(organizations.length);
    expect(newState.organizations[0].id).to.equal(organizations[0].id);
  });

  it('should return only modified fields so our custom reducer can merge changes', () => {
    const orgState = reducer(initialState, orgAction);
    const orgsState = reducer(initialState, orgsAction);

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
