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

const organizationsCollaborator = organizations;
const organizationsOwned = organizations;

export const organization = organizations[0];

export const orgAction = {
  type: actionTypes.SET_CURRENT_ORGANIZATION,
  organization,
};

export const orgsCollaboratorAction = {
  type: actionTypes.SET_ORGANIZATIONS_COLLABORATOR,
  organizationsCollaborator,
};

export const orgsOwnedAction = {
  type: actionTypes.SET_ORGANIZATIONS_OWNED,
  organizationsOwned,
};

export const bogusAction = {
  type: 'LOL NO',
  organizations,
};
