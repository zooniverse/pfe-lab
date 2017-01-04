import * as types from '../../../constants/action-types';

export function setCurrentOrganization(organization) {
  return {
    type: types.SET_CURRENT_ORGANIZATION,
    organization,
  };
}

export function setOrganizations(organizations) {
  return {
    type: types.SET_ORGANIZATIONS,
    organizations,
  };
}
