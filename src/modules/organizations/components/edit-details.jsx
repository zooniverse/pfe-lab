import React from 'react';

import { organizationShape } from '../model';
import DetailsFormContainer from '../containers/details-form-container';

const EditDetails = ({ organization, updateOrganization }) => {
  if (!organization) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <div>
      <h1>Edit Organization Details</h1>
      <p>Input the basic information about your organization and setup its home page.</p>
      <div>
        <aside className="aside">
          <p>avatar uploader</p>
          <p>background uploader</p>
        </aside>
        <DetailsFormContainer updateOrganization={updateOrganization} />
      </div>
    </div>
  );
};

EditDetails.propTypes = {
  organization: organizationShape,
  updateOrganization: React.PropTypes.func,
};

export default EditDetails;
