import React from 'react';

import { organizationCollaboratorsShape, organizationOwnerShape } from '../model';

const EditCollaborators = ({ organizationOwner, organizationCollaborators, possibleRoles, removeCollaborator, rolesInfo, saving, updateCollaborator, user }) => {
  if (!organizationCollaborators || !organizationOwner) {
    return <div>Loading...</div>;
  }

  const toggleRole = (collaborator, event) => {
    updateCollaborator(collaborator, event.target.value, event.target.checked);
  };

  const handleRemoval = (collaborator) => {
    removeCollaborator(collaborator);
  };

  return (
    <div className="collaborators">
      <div className="organization-section-header">Collaborators</div>
      <h4 className="collaborators__title">Organization Owner</h4>
      <p>{(user.id === organizationOwner.id) ? 'You are the organization owner.' : `${organizationOwner.display_name} is the organization owner.`}</p>

      <br />

      <h4 className="collaborators__title">Collaborators</h4>

      {organizationCollaborators.length === 0 &&
        <em className="form-help">None yet</em>}
      {organizationCollaborators.length > 0 &&
        (<ul>
          {organizationCollaborators.map((collaborator) => {
            return (<li key={collaborator.id}>
              <span>
                <strong>{collaborator.id}</strong>
                <button type="button" onClick={handleRemoval.bind(this, collaborator)}>&times;</button>
              </span>
              <br />
              {Object.keys(possibleRoles).map((role, i) => {
                return (
                  <label key={`role-${i}`}>
                    <input
                      type="checkbox"
                      name={role}
                      checked={collaborator.roles.includes(role)}
                      onChange={toggleRole.bind(this, collaborator)}
                      value={role}
                      disabled={saving === collaborator.id}
                    />
                    {rolesInfo[role].label}
                  </label>);
              })}
            </li>);
          })}
        </ul>)}
    </div>
  );
};

EditCollaborators.defaultProps = {
  possibleRoles: {},
  rolesInfo: {},
};

EditCollaborators.propTypes = {
  organizationCollaborators: organizationCollaboratorsShape,
  organizationOwner: organizationOwnerShape,
  possibleRoles: React.PropTypes.objectOf(React.PropTypes.string).isRequired,
  removeCollaborator: React.PropTypes.func,
  rolesInfo: React.PropTypes.objectOf(React.PropTypes.object).isRequired,
  saving: React.PropTypes.string,
  updateCollaborator: React.PropTypes.func,
  user: React.PropTypes.shape({
    id: React.PropTypes.string,
  }),
};

export default EditCollaborators;
