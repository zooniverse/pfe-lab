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

export function setOrganizationsAvatars(organizationsAvatars) {
  return {
    type: types.SET_ORGANIZATIONS_AVATARS,
    organizationsAvatars
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

export function setOrganizationPage(organizationPage) {
  return {
    type: types.SET_ORGANIZATION_PAGE,
    organizationPage,
  };
}

export function setOrganizationProjects(projects) {
  return {
    type: types.SET_ORGANIZATION_PROJECTS,
    projects,
  };
}

export function setOrganizationAvatar(organizationAvatar) {
  return {
    type: types.SET_ORGANIZATION_AVATAR,
    organizationAvatar
  };
}

export function setOrganizationBackground(organizationBackground) {
  return {
    type: types.SET_ORGANIZATION_BACKGROUND,
    organizationBackground
  };
}
