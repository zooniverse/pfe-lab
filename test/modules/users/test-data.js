import * as actionTypes from '../../../src/constants/action-types';

export const user = {
  admin: false,
  credited_name: 'Bob Ross',
  display_name: 'bob_ross',
  email: 'bob.ross@happytree.org',
  id: '3',
  login: 'bob_ross',
  name: 'bob_ross',
  type: 'users',
  zooniverse_id: 'panoptes-3',
};

export const userAction = {
  type: actionTypes.SET_LOGIN_USER,
  user,
};

export const noUserAction = {
  type: actionTypes.SET_LOGIN_USER,
  user: null,
};

export const bogusAction = {
  type: 'LOL NO',
  user,
};
