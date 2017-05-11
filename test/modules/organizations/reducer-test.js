import { expect } from 'chai';

import initialState from '../../../src/initial-state';

import {
  organization,
  organizations,
  organizationCollaborators,
  organizationOwner,
  organizationsAvatars,
  projects,
  organizationAvatar,
  organizationBackground,
  setCurrentOrganizationAction,
  setCollaboratedOrganizationsAction,
  setOwnedOrganizationsAction,
  setOrganizationCollaboratorsAction,
  setOrganizationOwnerAction,
  setOrganizationProjectsAction,
  setOrganizationsAvatarsAction,
  setOrganizationAvatarAction,
  setOrganizationBackgroundAction,
  bogusAction,
} from './test-data';

import reducer from '../../../src/modules/organizations/reducer';

describe('OrganizationsReducer', () => {
  it('should return only modified fields so our custom reducer can merge changes', () => {
    const currentOrganizationState = reducer(initialState, setCurrentOrganizationAction);

    expect(currentOrganizationState.organization).to.be.defined;
    expect(currentOrganizationState.organizations).to.be.undefined;
    expect(currentOrganizationState.user).to.be.undefined;
    expect(currentOrganizationState.initialized).to.be.undefined;
  });

  it('should respond to unknown actions with the same state', () => {
    const newState = reducer(initialState, bogusAction);

    expect(newState).to.equal(initialState);
  });

  describe('action types', function() {
    it('should put a new organization into the state on receiving a SET_CURRENT_ORGANIZATION', () => {
      const newState = reducer(initialState, setCurrentOrganizationAction);

      expect(newState.organization).to.not.be.null;
      expect(newState.organization.id).to.equal(organization.id);
    });

    it('should put a new organizations list into the state on receiving a SET_COLLABORATED_ORGANIZATIONS', function() {

      const newState = reducer(initialState, setCollaboratedOrganizationsAction);

      expect(newState.collaboratedOrganizations).to.not.be.null;
      expect(newState.collaboratedOrganizations).to.have.lengthOf(organizations.length);
      expect(newState.collaboratedOrganizations[0].id).to.equal(organizations[0].id);
    });

    it('should put a new organizations list into the state on receiving a SET_OWNED_ORGANIZATIONS', () => {
      const newState = reducer(initialState, setOwnedOrganizationsAction);

      expect(newState.ownedOrganizations).to.not.be.null;
      expect(newState.ownedOrganizations).to.have.lengthOf(organizations.length);
      expect(newState.ownedOrganizations[0].id).to.equal(organizations[0].id);
    });

    it('should put a new list of collaborators into the state on receiving a SET_ORGANIZATION_COLLABORATORS', function() {
      const newState = reducer(initialState, setOrganizationCollaboratorsAction);

      expect(newState.organizationCollaborators).to.not.be.null;
      expect(newState.organizationCollaborators).to.have.lengthOf(organizationCollaborators.length);
      expect(newState.organizationCollaborators[0].id).to.equal(organizationCollaborators[0].id);
    });

    it('should put a new owner into the state on receiving a SET_ORGANIZATION_OWNER', function() {
      const newState = reducer(initialState, setOrganizationOwnerAction);

      expect(newState.organizationOwner).to.not.be.null;
      expect(newState.organizationOwner.id).to.equal(organizationOwner.id);
    });

    it('should put a new list of projects into the state on receiving a SET_ORGANIZATION_PROJECTS', function() {
      const newState = reducer(initialState, setOrganizationProjectsAction);

      expect(newState.organizationProjects).to.not.be.null;
      expect(newState.organizationProjects).to.have.lengthOf(projects.length);
      expect(newState.organizationProjects[0].id).to.equal(projects[0].id);
    });

    it('should put a new list of avatars into state on receiving a SET_ORGANIZATIONS_AVATARS', function() {
      const newState = reducer(initialState, setOrganizationsAvatarsAction);

      expect(newState.organizationsAvatars).to.not.be.null;
      expect(newState.organizationsAvatars).to.have.lengthOf(organizationsAvatars.length);
      expect(newState.organizationsAvatars[0].src).to.equal(organizationsAvatars[0].src);
    });

    it('should put a new avatar into state on receiving a SET_ORGANIZATION_AVATAR', function() {
      const newState = reducer(initialState, setOrganizationAvatarAction);

      expect(newState.organizationAvatar).to.not.be.null;
      expect(newState.organizationAvatar.src).to.equal(organizationAvatar.src);
    });

    it('should put a new background into state on receiving a SET_ORGANIZATION_BACKGROUND', function() {
      const newState = reducer(initialState, setOrganizationBackgroundAction);

      expect(newState.organizationBackground).to.not.be.null;
      expect(newState.organizationBackground.src).to.equal(organizationBackground.src);
    });
  });
});
