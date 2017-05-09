import React from 'react';

import { organizationShape, organizationAvatarShape, organizationBackgroundShape } from '../model';
import DetailsFormContainer from '../containers/details-form-container';
import ImageSelector from '../../common/containers/image-selector';

const EditDetails = (props) => {
  if (!props.organization) {
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
              allowDelete={false}
              label="Avatar"
              onChange={props.handleMediaChange}
              onDelete={props.handleMediaDelete}
              maxSize={props.maxAvatarSize}
              resourceSrc={props.organizationAvatar.src}
              resourceType="avatar"
            />
            <small>Pick a logo to represent your organization. To add an image, either drag and drop or click to open your file viewer. For best results, use a square image of not more than 50 KB.</small>
          </div>
          <hr />
          <div>
            <ImageSelector
              allowDelete={false}
              label="Background"
              onChange={props.handleMediaChange}
              maxBackgroundSize={props.maxBackgroundSize}
              resourceSrc={props.organizationBackground.src}
              resourceType="background"
            />
            <small>This image will be the background for your organization page. To add an image, either drag and drop or left click to open your file viewer. For best results, use good quality images no more than 256 KB.</small>
          </div>
        </aside>
        <section className="forms__section">
          <DetailsFormContainer updateOrganization={props.updateOrganization} />
          <hr />
          <button
            type="button"
            className="button button--full-alert"
            disabled={props.deletionInProgress}
            onClick={props.deleteOrganization}
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
  deletingMedia: React.PropTypes.bool,
  handleMediaChange: React.PropTypes.func,
  handleMediaDelete: React.PropTypes.func,
  maxAvatarSize: React.PropTypes.number,
  maxBackgroundSize: React.PropTypes.number,
  organization: organizationShape,
  organizationAvatar: organizationAvatarShape,
  organizationBackground: organizationBackgroundShape,
  updateOrganization: React.PropTypes.func,
};

EditDetails.defaultProps = {
  deletionInProgress: false,
  maxAvatarSize: 64000,
  maxBackgroundSize: 256000
};

export default EditDetails;
