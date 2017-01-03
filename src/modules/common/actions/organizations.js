import * as types from '../../../constants/action-types';

export function setCurrentOrganization(organization) { // eslint-disable-line import/prefer-default-export
  return (dispatch) => {
    dispatch({
      type: types.SET_CURRENT_ORGANIZATION,
      organization,
    });
  };
}

export function setOrganizations(organizations) { // eslint-disable-line import/prefer-default-export
  return (dispatch) => {
    dispatch({
      type: types.SET_ORGANIZATIONS,
      organizations,
    });
  };
}
