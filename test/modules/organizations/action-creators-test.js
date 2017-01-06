import { expect } from 'chai';

import * as actionTypes from '../../../src/constants/action-types';
import { setCurrentOrganization, setOrganizations } from '../../../src/modules/organizations/action-creators';
import { organizations, organization } from './test-data';

describe('OrganizationActionCreators', () => {
  it('should build the setCurrentOrganization action as expected', () => {
    const setOrgAction = setCurrentOrganization(organization);

    expect(setOrgAction.organization).to.not.be.null;
    expect(setOrgAction.type).to.equal(actionTypes.SET_CURRENT_ORGANIZATION);
    expect(setOrgAction.organization.id).to.equal(organization.id);
  });

  it('should build the setOrganizations action as expected', () => {
    const setOrgsAction = setOrganizations(organizations);

    expect(setOrgsAction.organizations).to.not.be.null;
    expect(setOrgsAction.organizations).to.have.length(organizations.length);
    expect(setOrgsAction.type).to.equal(actionTypes.SET_ORGANIZATIONS);
    expect(setOrgsAction.organizations[0].id).to.equal(organizations[0].id);
    expect(setOrgsAction.organizations[1].id).to.equal(organizations[1].id);
  });
});
