import * as types from '../constants/action-types';
import initialState from './initial-state';

export default function (state = initialState, action) { // eslint-disable-line import/prefer-default-export
  switch (action.type) {
    case types.SET_CURRENT_ORGANIZATION:
      return Object.assign({}, state, {
        organization: action.organization,
      });
    case types.SET_ORGANIZATIONS:
      return Object.assign({}, state, {
        organizations: action.organizations,
      });
    default:
      return state;
  }
}
