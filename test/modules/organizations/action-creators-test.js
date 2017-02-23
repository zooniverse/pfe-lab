import { expect } from 'chai';

import * as actionTypes from '../../../src/constants/action-types';
import { setCurrentOrganization, setOwnedOrganizations, setCollaboratorOrganizations } from '../../../src/modules/organizations/action-creators';
import { organizations, organization } from './test-data';

describe('OrganizationActionCreators', () => {
  it('should build the setCurrentOrganization action as expected', () => {
    const setOrgAction = setCurrentOrganization(organization);

    expect(setOrgAction.organization).to.not.be.null;
    expect(setOrgAction.type).to.equal(actionTypes.SET_CURRENT_ORGANIZATION);
    expect(setOrgAction.organization.id).to.equal(organization.id);
  });

  it('should build the setOwnedOrganizations action as expected', () => {
    const setOwnedOrgsAction = setOwnedOrganizations(organizations);

    expect(setOwnedOrgsAction.ownedOrganizations).to.not.be.null;
    expect(setOwnedOrgsAction.ownedOrganizations).to.have.length(organizations.length);
    expect(setOwnedOrgsAction.type).to.equal(actionTypes.SET_OWNED_ORGANIZATIONS);
    expect(setOwnedOrgsAction.ownedOrganizations[0].id).to.equal(organizations[0].id);
    expect(setOwnedOrgsAction.ownedOrganizations[1].id).to.equal(organizations[1].id);
  });

  it('should build the setCollaboratorOrganizations action as expected', () => {
    const setCollaboratorOrgsAction = setCollaboratorOrganizations(organizations);

    expect(setCollaboratorOrgsAction.collaboratorOrganizations).to.not.be.null;
    expect(setCollaboratorOrgsAction.collaboratorOrganizations).to.have.length(organizations.length);
    expect(setCollaboratorOrgsAction.type).to.equal(actionTypes.SET_COLLABORATOR_ORGANIZATIONS);
    expect(setCollaboratorOrgsAction.collaboratorOrganizations[0].id).to.equal(organizations[0].id);
    expect(setCollaboratorOrgsAction.collaboratorOrganizations[1].id).to.equal(organizations[1].id);
  });
});
