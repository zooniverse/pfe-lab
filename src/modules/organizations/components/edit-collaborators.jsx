import React from 'react';

import { organizationShape } from '../model';

const EditCollaborators = ({ organization }) => {
  if (!organization) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{organization.display_name}</h2>
      <p>you are editing collaborators for this project</p>
    </div>
  );
};

EditCollaborators.propTypes = {
  organization: organizationShape,
};

export default EditCollaborators;
