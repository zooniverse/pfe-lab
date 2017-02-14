import * as types from '../../constants/action-types';

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

export function setOrganizationCollaborators(organizationCollaborators) {
  return {
    type: types.SET_ORGANIZATION_COLLABORATORS,
    organizationCollaborators,
  };
}

export function setOrganizationOwner(organizationOwner) {
  return {
    type: types.SET_ORGANIZATION_OWNER,
    organizationOwner,
  };
}
