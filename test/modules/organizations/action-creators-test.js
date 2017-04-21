import { expect } from 'chai';

import * as actionTypes from '../../../src/constants/action-types';
import { setCurrentOrganization, setOrganizationsOwned, setOrganizationsCollaborator } from '../../../src/modules/organizations/action-creators';
import { organizations, organization } from './test-data';

describe('OrganizationActionCreators', () => {
  it('should build the setCurrentOrganization action as expected', () => {
    const setOrgAction = setCurrentOrganization(organization);

    expect(setOrgAction.organization).to.not.be.null;
    expect(setOrgAction.type).to.equal(actionTypes.SET_CURRENT_ORGANIZATION);
    expect(setOrgAction.organization.id).to.equal(organization.id);
  });

  it('should build the setOrganizationsOwned action as expected', () => {
    const setOrgsOwnedAction = setOrganizationsOwned(organizations);

    expect(setOrgsOwnedAction.organizationsOwned).to.not.be.null;
    expect(setOrgsOwnedAction.organizationsOwned).to.have.length(organizations.length);
    expect(setOrgsOwnedAction.type).to.equal(actionTypes.SET_ORGANIZATIONS_OWNED);
    expect(setOrgsOwnedAction.organizationsOwned[0].id).to.equal(organizations[0].id);
    expect(setOrgsOwnedAction.organizationsOwned[1].id).to.equal(organizations[1].id);
  });

  it('should build the setOrganizationsCollaborator action as expected', () => {
    const setOrgsCollaboratorAction = setOrganizationsCollaborator(organizations);

    expect(setOrgsCollaboratorAction.organizationsCollaborator).to.not.be.null;
    expect(setOrgsCollaboratorAction.organizationsCollaborator).to.have.length(organizations.length);
    expect(setOrgsCollaboratorAction.type).to.equal(actionTypes.SET_ORGANIZATIONS_COLLABORATOR);
    expect(setOrgsCollaboratorAction.organizationsCollaborator[0].id).to.equal(organizations[0].id);
    expect(setOrgsCollaboratorAction.organizationsCollaborator[1].id).to.equal(organizations[1].id);
  });
});
