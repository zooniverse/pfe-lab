import React from 'react';

import { organizationShape, organizationCollaboratorsShape, organizationOwnerShape } from '../model';

import bindInput from '../../common/containers/bind-input';

const EditCollaborators = ({ organization, organizationOwner, organizationCollaborators, updateOrganizationCollaborators, user }) => {
  if (!organizationCollaborators || !organizationOwner) {
    return <div>Loading...</div>;
  }

  const POSSIBLE_ROLES = {
    collaborator: 'admin',
    expert: 'team',
    scientist: 'scientist',
    moderator: 'moderator',
    tester: 'team',
  };

  const ROLES_INFO = {
    collaborator: {
      label: 'Collaborator',
      description: 'Collaborators have full access to edit workflows and project content, including deleting some or all of the project.',
    },
    expert: {
      label: 'Expert',
      description: 'Experts can enter "gold mode" to make authoritative gold standard classifications that will be used to validate data quality.',
    },
    scientist: {
      label: 'Researcher',
      description: 'Members of the research team will be marked as researchers on "Talk"',
    },
    moderator: {
      label: 'Moderator',
      description: 'Moderators have extra privileges in the community discussion area to moderate discussions. They will also be marked as moderators on "Talk".',
    },
    tester: {
      label: 'Tester',
      description: 'Testers can view and classify on your project to give feedback while it’s still private. They cannot access the project builder.',
    },
    translator: {
      label: 'Translator',
      description: 'Translators will have access to the translation site.',
    },
  };

  return (
    <div>
      <h3 className="form-label">Organization Owner</h3>
      <p>{(user.id === organizationOwner.id) ? 'You are the organization owner.' : `${organizationOwner.display_name} is the organization owner.`}</p>

      <br />

      <h3 className="form-label">Collaborators</h3>

      <hr />
      {organizationCollaborators.length === 1 &&
        <em className="form-help">None yet</em>}
      {organizationCollaborators.length > 1 &&
        (<ul>
          {organizationCollaborators.map((collaborator) => {
            return (<li key={collaborator.id}>
              <strong>{collaborator.id}</strong>
              <label>
                <input type="checkbox" />
                {collaborator.roles.map((role) => {
                  return (
                    <span>{ROLES_INFO[role].label}</span>);
                })}
              </label>
            </li>);
          })}
        </ul>)}

      <hr />

      <div className="form-label">Add another</div>
    </div>
  );
};

EditCollaborators.propTypes = {
  organization: organizationShape,
  organizationCollaborators: organizationCollaboratorsShape,
  organizationOwner: organizationOwnerShape,
  updateOrganizationCollaborators: React.PropTypes.func,
  user: React.PropTypes.shape({
    id: React.PropTypes.string,
  }),
};

export default EditCollaborators;
