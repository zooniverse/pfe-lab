import * as types from '../../constants/action-types';

export function setAdminMode(adminMode) { // eslint-disable-line import/prefer-default-export
  return {
    type: types.SET_ADMIN_MODE,
    adminMode,
  };
}
