import * as actionTypes from '../../../src/constants/action-types';

export const user = {
  id: '3',
  name: 'bob_ross',
  email: 'bob.ross@happytree.org',
  display_name: 'bob_ross',
  credited_name: 'Bob Ross',
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
