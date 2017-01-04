import oauth from 'panoptes-client/lib/oauth';
import * as types from '../../../constants/action-types';

export function setLoginUser(user) {
  return {
    type: types.SET_LOGIN_USER,
    user,
  };
}

export function checkLoginUser(dispatch) {
  oauth.checkCurrent()
    .then((user) => {
      dispatch(setLoginUser(user));
    });
}

function computeRedirectURL(window) {
  return window.location.origin ||
    `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
}

export function loginToPanoptes() {
  oauth.signIn(computeRedirectURL(window));
}

export function logoutFromPanoptes(dispatch) {
  oauth.signOut()
    .then((user) => {
      dispatch(setLoginUser(user));
    });
}
