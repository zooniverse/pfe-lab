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
      <div className="organization-section-header">Edit Organization Details</div>
      <p>Input the basic information about your organization and setup its home page.</p>
      <div className="organization-edit-details__forms">
        <aside className="forms__aside">
          <div>
            <ImageSelector
              allowDelete={false}
              label="Avatar"
              onChange={props.handleMediaChange}
              maxSize={props.maxAvatarSize}
              resourceSrc={props.organizationAvatar.src}
              resourceType="avatar"
            />
            <small>
              Pick a logo to represent your organization.
              To add an image, either drag and drop or click to open your file viewer.
              For best results, use a square image of not more than 50 KB.
            </small>
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
            <small>
              This image will be the background for your organization page.
              To add an image, either drag and drop or left click to open your file viewer.
              For best results, use good quality images no more than 256 KB.
            </small>
          </div>
        </aside>
        <section className="forms__section">
          <DetailsFormContainer updateOrganization={props.updateOrganization} />
          <span className="form__label">Status</span>
          <div>
            <span>
              Listed:{' '}
              <span className={props.organization.listed ? 'color-label green' : 'color-label red'}>
                {props.organization.listed.toString()}
              </span>
            </span>
            <br />
            <span>
              Listed At:{' '}
              {props.organization.listed ? Date(props.organization.listed_at) : 'N/A'}
            </span>
          </div>
        </section>
      </div>
    </div>
  );
};

EditDetails.propTypes = {
  handleMediaChange: React.PropTypes.func,
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
