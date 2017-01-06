import oauth from 'panoptes-client/lib/oauth';
import { setLoginUser } from '../modules/users/action-creators';

export function checkLoginUser(dispatch) {
  oauth.checkCurrent()
    .then((user) => {
      dispatch(setLoginUser(user));
    }).catch((msg) => {
      console.log('what the fuck');
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
  oauth.signOut();
  dispatch(setLoginUser(null));
}
