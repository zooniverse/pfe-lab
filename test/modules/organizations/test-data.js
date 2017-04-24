import * as actionTypes from '../../../src/constants/action-types';

export const organizations = [
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

const collaboratedOrganizations = organizations;
const ownedOrganizations = organizations;

export const organization = organizations[0];

export const setCurrentOrganizationAction = {
  type: actionTypes.SET_CURRENT_ORGANIZATION,
  organization,
};

export const setCollaboratedOrganizationAction = {
  type: actionTypes.SET_COLLABORATED_ORGANIZATIONS,
  collaboratedOrganizations,
};

export const setOwnedOrganizationsAction = {
  type: actionTypes.SET_OWNED_ORGANIZATIONS,
  ownedOrganizations,
};

export const bogusAction = {
  type: 'LOL NO',
  organizations,
};
