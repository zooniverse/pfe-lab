import * as types from '../../constants/action-types';
import initialState from '../../initial-state';

export default function (state = initialState, action) { // eslint-disable-line import/prefer-default-export
  switch (action.type) {
    case types.SET_ADMIN_MODE:
      return {
        adminMode: action.adminMode,
      };
    case types.SET_APP_NOTIFICATION:
      return {
        appNotification: action.appNotification
      };
    default:
      return state;
  }
}
