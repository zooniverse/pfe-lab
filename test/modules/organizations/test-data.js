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

export const organization = organizations[0];

export const orgAction = {
  type: actionTypes.SET_CURRENT_ORGANIZATION,
  organization,
};

export const orgsAction = {
  type: actionTypes.SET_ORGANIZATIONS,
  organizations,
};

export const bogusAction = {
  type: 'LOL NO',
  organizations,
};
