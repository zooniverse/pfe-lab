import React from 'react';

import { organizationShape, organizationCollaboratorsShape, organizationOwnerShape } from '../model';

import bindInput from '../../common/containers/bind-input';

const EditCollaborators = ({ organization, organizationOwner, organizationCollaborators, updateOrganizationCollaborators, user }) => {
  if (!organization) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3 className="form-label">Organization Owner</h3>
      <p>{(user.id === organizationOwner.id) ? 'You are the organization owner.' : `${organizationOwner.dispaly_name} is the organization owner.`}</p>

      <br />

      <h3 className="form-label">Collaborators</h3>

      <hr />
      {organizationCollaborators.length === 1 &&
        <em className="form-help">None yet</em>}
      {organizationCollaborators.length > 1 &&
        (<ul>
          {organizationCollaborators.map((collaborator) => {
            return (<li key={collaborator.id}>
              <strong>{collaborator.displayName}</strong>
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
