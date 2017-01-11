import oauth from 'panoptes-client/lib/oauth';
import { setLoginUser } from '../modules/users/action-creators';

export function checkLoginUser(dispatch) {
  return oauth.checkCurrent()
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
  dispatch(setLoginUser(null));
  return oauth.signOut();
}
