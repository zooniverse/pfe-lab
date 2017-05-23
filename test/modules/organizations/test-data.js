import * as actionTypes from '../../../src/constants/action-types';

export const organizations = [
  {
    id: '7',
    display_name: 'Test Organization',
    description: 'blah blah blah blah',
    links: {
      owner: { display_name: 'Bob' }
    },
  },
  {
    id: '42',
    display_name: 'Deep Thought',
    description: 'Probably wrong about everything',
    links: {
      owner: { display_name: 'Bob' }
    },
  },
];

export const organization = organizations[0];

const collaboratedOrganizations = organizations;
const ownedOrganizations = organizations;

export const users = [
  { id: '5' },
  { id: '10' }
];

export const organizationOwner = users[0];

export const organizationCollaborators = [
  { id: '49',
    roles: ['collaborator'],
    links: {
      organization: organizations[0].id,
      owner: {
        id: users[0].id,
        type: 'users'
      }
    }
  },
  { id: '64',
    roles: ['collaborator'],
    links: {
      organization: organizations[0].id,
      owner: {
        id: users[1].id,
        type: 'users'
      }
    }
  }
];

export const projects = [
  { id: '93' },
  { id: '323' }
];

export const organizationsAvatars = [
  { src: 'avatar.jpg' },
  { src: 'logo.png' }
];

export const organizationAvatar = organizationsAvatars[0];

export const organizationBackground = {
  src: 'background.jpg'
};

export const organizationPage = {
  id: '45',
  url_key: 'about'
};

export const setCurrentOrganizationAction = {
  type: actionTypes.SET_CURRENT_ORGANIZATION,
  organization,
};

export const setCollaboratedOrganizationsAction = {
  type: actionTypes.SET_COLLABORATED_ORGANIZATIONS,
  collaboratedOrganizations,
};

export const setOwnedOrganizationsAction = {
  type: actionTypes.SET_OWNED_ORGANIZATIONS,
  ownedOrganizations,
};

export const setOrganizationCollaboratorsAction = {
  type: actionTypes.SET_ORGANIZATION_COLLABORATORS,
  organizationCollaborators
};

export const setOrganizationOwnerAction = {
  type: actionTypes.SET_ORGANIZATION_OWNER,
  organizationOwner
};

export const setOrganizationProjectsAction = {
  type: actionTypes.SET_ORGANIZATION_PROJECTS,
  projects
};

export const setOrganizationsAvatarsAction = {
  type: actionTypes.SET_ORGANIZATIONS_AVATARS,
  organizationsAvatars
};

export const setOrganizationAvatarAction = {
  type: actionTypes.SET_ORGANIZATION_AVATAR,
  organizationAvatar
};

export const setOrganizationBackgroundAction = {
  type: actionTypes.SET_ORGANIZATION_BACKGROUND,
  organizationBackground
};

export const bogusAction = {
  type: 'LOL NO',
  organizations,
};
