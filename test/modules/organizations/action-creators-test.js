import { expect } from 'chai';

import * as actionTypes from '../../../src/constants/action-types';
import { setCurrentOrganization, setOwnedOrganizations, setCollaboratedOrganizations } from '../../../src/modules/organizations/action-creators';
import { organizations, organization } from './test-data';

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
});
