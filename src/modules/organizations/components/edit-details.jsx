import React from 'react';

import { organizationShape, organizationAvatarShape } from '../model';
import DetailsFormContainer from '../containers/details-form-container';
import ImageSelector from '../../common/containers/image-selector';

const EditDetails = ({ deleteOrganization, deletionInProgress, organization, organizationAvatar, updateOrganization }) => {
  if (!organization) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <div className="organization-edit-details">
      <h1>Edit Organization Details</h1>
      <p>Input the basic information about your organization and setup its home page.</p>
      <div className="organization-edit-details__forms">
        <aside className="forms__aside">
          <div>
            <ImageSelector
              label={'Avatar'}
              resourceSrc={organizationAvatar.src}
            />
            <small>Pick a logo to represent your organization. To add an image, either drag and drop or click to open your file viewer. For best results, use a square image of not more than 50 KB.</small>
          </div>
          <hr />
          <div>
            <ImageSelector
              label={'Background'}
              resourceSrc={''}
            />
            <small>This image will be the background for your organization page. To add an image, either drag and drop or left click to open your file viewer. For best results, use good quality images no more than 256 KB.</small>
          </div>
        </aside>
        <section className="forms__section">
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
        </section>
      </div>
    </div>
  );
};

EditDetails.propTypes = {
  deleteOrganization: React.PropTypes.func,
  deletionInProgress: React.PropTypes.bool,
  organization: organizationShape,
  organizationAvatar: organizationAvatarShape,
  updateOrganization: React.PropTypes.func,
};

EditDetails.defaultProps = {
  deletionInProgress: false
};

export default EditDetails;
