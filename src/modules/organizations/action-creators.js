import * as types from '../../constants/action-types';

export function setCurrentOrganization(organization) {
  return {
    type: types.SET_CURRENT_ORGANIZATION,
    organization,
  };
}

export function setCollaboratedOrganizations(collaboratedOrganizations) {
  return {
    type: types.SET_COLLABORATED_ORGANIZATIONS,
    collaboratedOrganizations,
  };
}

export function setOwnedOrganizations(ownedOrganizations) {
  return {
    type: types.SET_OWNED_ORGANIZATIONS,
    ownedOrganizations,
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

export function setOrganizationProjects(projects) {
  return {
    type: types.SET_ORGANIZATION_PROJECTS,
    projects,
  };
}

export function addOrganizationProject(project) {
  return {
    type: types.ADD_ORGANIZATION_PROJECT,
    project,
  };
}

export function removeOrganizationProject(projectId) {
  return {
    type: types.REMOVE_ORGANIZATION_PROJECT,
    projectId,
  };
}

export function setOrganizationRoles(organizationRoles) {
  return {
    type: types.SET_ORGANIZATION_ROLES,
    organizationRoles,
  };
}
