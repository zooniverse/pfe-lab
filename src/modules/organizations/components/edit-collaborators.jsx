import React from 'react';
import PropTypes from 'prop-types';
import { organizationCollaboratorsShape, organizationOwnerShape } from '../model';

const EditCollaborators = ({ organizationOwner, organizationCollaborators, possibleRoles, removeCollaborator, rolesInfo, saving, updateCollaborator, user }) => {
  if (!organizationOwner) {
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
      <h3 className="organization-layout__section-header">Collaborators</h3>
      <h4 className="collaborators__title">Organization Owner</h4>
      <p>{(user.id === organizationOwner.id) ?
        'You are the organization owner.' : `${organizationOwner.display_name} is the organization owner.`}
      </p>

      <br />

      <h4 className="collaborators__title">Collaborators</h4>
      <hr />

      {(organizationCollaborators && organizationCollaborators.length) ?
        <div>
          {organizationCollaborators.map((collaborator) => {
            return (<p key={collaborator.id}>
              <span>
                <strong>{collaborator.display_name}</strong>{' '}
                <button
                  type="button"
                  className="collaborators__button"
                  onClick={handleRemoval.bind(this, collaborator)}
                >&times;
                </button>
              </span>
              <br />
              {Object.keys(possibleRoles).map((role, i) => {
                return (
                  <label htmlFor={`role-${i}`} key={`role-${i}`}>
                    <input
                      type="checkbox"
                      name={role}
                      checked={collaborator.roles.includes(role)}
                      onChange={toggleRole.bind(this, collaborator)}
                      value={role}
                      disabled={saving === collaborator.id}
                    />{' '}
                    {rolesInfo[role].label}
                  </label>);
              })}
            </p>);
          })}
        </div> : <em className="form-help">None yet</em>}
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
  possibleRoles: PropTypes.objectOf(PropTypes.string).isRequired,
  removeCollaborator: PropTypes.func,
  rolesInfo: PropTypes.objectOf(PropTypes.object).isRequired,
  saving: PropTypes.string,
  updateCollaborator: PropTypes.func,
  user: PropTypes.shape({
    id: PropTypes.string,
  }),
};

export default EditCollaborators;
