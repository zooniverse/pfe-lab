import * as types from '../../constants/action-types';
import initialState from '../../initial-state';

export default function (state = initialState, action) { // eslint-disable-line import/prefer-default-export
  switch (action.type) {
    case types.SET_CURRENT_ORGANIZATION:
      return { organization: action.organization };
    case types.SET_ORGANIZATIONS_COLLABORATOR:
      return { organizationsCollaborator: action.organizationsCollaborator };
    case types.SET_ORGANIZATIONS_OWNED:
      return { organizationsOwned: action.organizationsOwned };
    case types.SET_ORGANIZATION_COLLABORATORS:
      return { organizationCollaborators: action.organizationCollaborators };
    case types.SET_ORGANIZATION_OWNER:
      return { organizationOwner: action.organizationOwner };
    case types.SET_ORGANIZATION_PROJECTS:
      return { organizationProjects: action.projects };
    case types.ADD_ORGANIZATION_PROJECT:
      return { organizationProjects: (state.organizationProjects || []).concat([action.project]) };
    case types.REMOVE_ORGANIZATION_PROJECT:
      return { organizationProjects: (state.organizationProjects || []).filter(p => p.id !== action.projectId) };
    case types.SET_ORGANIZATION_ROLES:
      return { organizationRoles: action.organizationRoles };
    default:
      return state;
  }
}
