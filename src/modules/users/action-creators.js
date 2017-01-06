import * as types from '../../constants/action-types';

export function setLoginUser(user) { // eslint-disable-line import/prefer-default-export
  return {
    type: types.SET_LOGIN_USER,
    user,
  };
}
