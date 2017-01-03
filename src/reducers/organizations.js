import * as types from '../constants/action-types';
import initialState from './initial-state';

export function updateOrganization(state = initialState, action) { // eslint-disable-line import/prefer-default-export
  switch (action.type) {
    case types.SET_CURRENT_ORGANIZATION:
      return {
        organization: action.organization,
      };
    default:
      return state;
  }
}
