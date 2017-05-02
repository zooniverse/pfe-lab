import React from 'react';

import { organizationShape } from '../model';
import DetailsFormContainer from '../containers/details-form-container';

const EditDetails = ({ deleteOrganization, deletionInProgress, organization, updateOrganization }) => {
  if (!organization) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <div className="organization-edit-details">
      <h1>Edit Organization Details</h1>
      <p>Input the basic information about your organization and setup its home page.</p>
      <div>
        <aside className="aside">
          <p>avatar uploader</p>
          <p>background uploader</p>
        </aside>
        <DetailsFormContainer updateOrganization={updateOrganization} />
        <hr />
        <button
          type="button"
          className="button button--full-alert"
          disabled={deletionInProgress}
          onClick={deleteOrganization}
        >
          Delete this organization
        </button>
      </div>
    </div>
  );
};

EditDetails.propTypes = {
  deleteOrganization: React.PropTypes.func,
  deletionInProgress: React.PropTypes.bool,
  organization: organizationShape,
  updateOrganization: React.PropTypes.func,
};

EditDetails.defaultProps = {
  deletionInProgress: false
};

export default EditDetails;
