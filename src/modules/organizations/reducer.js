import * as types from '../../constants/action-types';
import initialState from '../../initial-state';

export default function (state = initialState, action) { // eslint-disable-line import/prefer-default-export
  switch (action.type) {
    case types.SET_CURRENT_ORGANIZATION:
      return { organization: action.organization };
    case types.SET_ORGANIZATIONS_AVATARS:
      return { organizationsAvatars: action.organizationsAvatars };
    case types.SET_COLLABORATED_ORGANIZATIONS:
      return { collaboratedOrganizations: action.collaboratedOrganizations };
    case types.SET_OWNED_ORGANIZATIONS:
      return { ownedOrganizations: action.ownedOrganizations };
    case types.SET_ORGANIZATION_COLLABORATORS:
      return { organizationCollaborators: action.organizationCollaborators };
    case types.SET_ORGANIZATION_OWNER:
      return { organizationOwner: action.organizationOwner };
    case types.SET_ORGANIZATION_PAGES:
      return { organizationPages: action.organizationPages };
    case types.SET_ORGANIZATION_PROJECTS:
      return { organizationProjects: action.projects };
    case types.SET_ORGANIZATION_AVATAR:
      return { organizationAvatar: action.organizationAvatar };
    case types.SET_ORGANIZATION_BACKGROUND:
      return { organizationBackground: action.organizationBackground };
    default:
      return state;
  }
}
