import * as types from '../../constants/action-types';
import initialState from '../../initial-state';

export default function (state = initialState, action) { // eslint-disable-line import/prefer-default-export
  switch (action.type) {
    case types.SET_CURRENT_ORGANIZATION:
      return { organization: action.organization };
    case types.SET_COLLABORATED_ORGANIZATIONS:
      return { collaboratedOrganizations: action.collaboratedOrganizations };
    case types.SET_OWNED_ORGANIZATIONS:
      return { ownedOrganizations: action.ownedOrganizations };
    case types.SET_ORGANIZATION_COLLABORATORS:
      return { organizationCollaborators: action.organizationCollaborators };
    case types.SET_ORGANIZATION_OWNER:
      return { organizationOwner: action.organizationOwner };
    case types.SET_ORGANIZATION_PROJECTS:
      return { organizationProjects: action.projects };
    default:
      return state;
  }
}
