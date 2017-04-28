import { expect } from 'chai';

import * as actionTypes from '../../../src/constants/action-types';
import {
  setCurrentOrganization,
  setOwnedOrganizations,
  setCollaboratedOrganizations,
  setOrganizationCollaborators,
  setOrganizationOwner,
  setOrganizationProjects,
  setOrganizationsAvatars
} from '../../../src/modules/organizations/action-creators';
import {
  organizations,
  organization,
  organizationCollaborators,
  organizationOwner,
  organizationsAvatars,
  projects,
} from './test-data';

describe('OrganizationActionCreators', () => {
  it('should build the setCurrentOrganization action as expected', () => {
    const setCurrentOrgAction = setCurrentOrganization(organization);

    expect(setCurrentOrgAction.organization).to.not.be.null;
    expect(setCurrentOrgAction.type).to.equal(actionTypes.SET_CURRENT_ORGANIZATION);
    expect(setCurrentOrgAction.organization.id).to.equal(organization.id);
  });

  it('should build the setOwnedOrganizations action as expected', () => {
    const setOwnedOrganizationsAction = setOwnedOrganizations(organizations);

    expect(setOwnedOrganizationsAction.ownedOrganizations).to.not.be.null;
    expect(setOwnedOrganizationsAction.ownedOrganizations).to.have.length(organizations.length);
    expect(setOwnedOrganizationsAction.type).to.equal(actionTypes.SET_OWNED_ORGANIZATIONS);
    expect(setOwnedOrganizationsAction.ownedOrganizations[0].id).to.equal(organizations[0].id);
    expect(setOwnedOrganizationsAction.ownedOrganizations[1].id).to.equal(organizations[1].id);
  });

  it('should build the setCollaboratedOrganizations action as expected', () => {
    const setCollaboratedOrganizationsAction = setCollaboratedOrganizations(organizations);

    expect(setCollaboratedOrganizationsAction.collaboratedOrganizations).to.not.be.null;
    expect(setCollaboratedOrganizationsAction.collaboratedOrganizations).to.have.length(organizations.length);
    expect(setCollaboratedOrganizationsAction.type).to.equal(actionTypes.SET_COLLABORATED_ORGANIZATIONS);
    expect(setCollaboratedOrganizationsAction.collaboratedOrganizations[0].id).to.equal(organizations[0].id);
    expect(setCollaboratedOrganizationsAction.collaboratedOrganizations[1].id).to.equal(organizations[1].id);
  });

  it('should build the setOrganizationCollaborators action as expected', function() {
    const setOrganizationCollaboratorsAction = setOrganizationCollaborators(organizationCollaborators);

    expect(setOrganizationCollaboratorsAction.organizationCollaborators).to.not.be.null;
    expect(setOrganizationCollaboratorsAction.organizationCollaborators).to.have.length(organizationCollaborators.length);
    expect(setOrganizationCollaboratorsAction.type).to.equal(actionTypes.SET_ORGANIZATION_COLLABORATORS);
    expect(setOrganizationCollaboratorsAction.organizationCollaborators[0].id).to.equal(organizationCollaborators[0].id);
  });

  it('should build the setOrganizationOwner action as expected', function() {
    const setOrganizationOwnerAction = setOrganizationOwner(organizationOwner);

    expect(setOrganizationOwnerAction.organizationOwner).to.not.be.null;
    expect(setOrganizationOwnerAction.organizationOwner).to.be.an('object');
    expect(setOrganizationOwnerAction.type).to.equal(actionTypes.SET_ORGANIZATION_OWNER);
    expect(setOrganizationOwnerAction.organizationOwner.id).to.equal(organizationOwner.id);
  });

  it('should build the setOrganizationProjects action as expected', function() {
    const setOrganizationProjectsAction = setOrganizationProjects(projects);

    expect(setOrganizationProjectsAction.projects).to.not.be.null;
    expect(setOrganizationProjectsAction.projects).to.have.length(projects.length);
    expect(setOrganizationProjectsAction.type).to.equal(actionTypes.SET_ORGANIZATION_PROJECTS);
    expect(setOrganizationProjectsAction.projects[0].id).to.equal(projects[0].id);
  });

  it('should build the setOrganizationsAvatars action as expected', function() {
    const setOrganizationsAvatarsAction = setOrganizationsAvatars(organizationsAvatars);

    expect(setOrganizationsAvatarsAction.organizationsAvatars).to.not.be.null;
    expect(setOrganizationsAvatarsAction.organizationsAvatars).to.have.length(organizationsAvatars.length);
    expect(setOrganizationsAvatarsAction.type).to.equal(actionTypes.SET_ORGANIZATIONS_AVATARS);
    expect(setOrganizationsAvatarsAction.organizationsAvatars[0].src).to.equal(organizationsAvatars[0].src);
  });
});
