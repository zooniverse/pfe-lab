import * as types from '../constants/action-types';
import initialState from './initial-state';

export default function (state = initialState, action) { // eslint-disable-line import/prefer-default-export
  switch (action.type) {
    case types.SET_LOGIN_USER:
      return Object.assign({}, state, {
        user: action.user,  // null if logged out.
        initialized: true,  // true once we know if user is logged in/out; false if unknown.
      });
    default:
      return state;
  }
}
