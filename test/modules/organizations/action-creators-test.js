import { expect } from 'chai';

import * as actionTypes from '../../../src/constants/action-types';
import { setCurrentOrganization, setOrganizations } from '../../../src/modules/organizations/action-creators';

const organizations = [
  {
    id: '7',
    display_name: 'Test Organization',
    description: 'blah blah blah blah',
  },
  {
    id: '42',
    display_name: 'Deep Thought',
    description: 'Probably wrong about everything',
  },
];

describe('OrganizationActionCreators', () => {
  it('should build the setCurrentOrganization action as expected', () => {
    const organization = organizations[0];
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
  });
});
