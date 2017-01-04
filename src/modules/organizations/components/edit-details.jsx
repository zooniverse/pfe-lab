import React from 'react';

import { organizationShape } from '../model';

const EditDetails = ({ organization }) => {
  if (!organization) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <div>
      <h2>{organization.display_name}</h2>
      <p><small>{organization.description}</small></p>
      <p>You are editing this organization</p>
    </div>
  );
};

EditDetails.propTypes = { organization: organizationShape };

export default EditDetails;
