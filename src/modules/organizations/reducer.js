import * as types from '../../constants/action-types';
import initialState from '../../initial-state';

export default function (state = initialState, action) { // eslint-disable-line import/prefer-default-export
  switch (action.type) {
    case types.SET_CURRENT_ORGANIZATION:
      return { organization: action.organization };
    case types.SET_ORGANIZATIONS:
      return { organizations: action.organizations };
    case types.SET_ORGANIZATION_COLLABORATORS:
      return { organizationRoles: action.organzationCollaborators };
    case types.SET_ORGANIZATION_OWNER:
      return { organizationOwner: action.organizationOwner };
    default:
      return state;
  }
}
