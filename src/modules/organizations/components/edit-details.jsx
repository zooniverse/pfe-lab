import React from 'react';

import { organizationShape } from '../model';
import DetailsFormContainer from '../containers/details-form-container';

const EditDetails = ({ organization, updateOrganization }) => {
  // TODO: ARB: this should be broken up into a container and some components
  if (!organization) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <div>
      <h1>Edit Organization Details</h1>
      <p>Input the basic information about your organization and set up its home page.</p>
      <DetailsFormContainer updateOrganization={updateOrganization} />
    </div>
  );
};

EditDetails.propTypes = {
  organization: organizationShape,
  updateOrganization: React.PropTypes.func,
};

export default EditDetails;
