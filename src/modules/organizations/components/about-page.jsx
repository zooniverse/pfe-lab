import React from 'react';
import PropTypes from 'prop-types';
import MarkdownEditor from '../../common/components/markdown-editor';

import FormContainer from '../../common/containers/form-container';
import { organizationShape, organizationPageShape } from '../model';

const AboutPage = (props) => {
  if (!props.organizationPage) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (Object.keys(props.organizationPage).length === 0) {
    return (
      <div>
        <p>
          This page is for you to describe the organization to the volunteers. Feel free to add detail, but try to avoid jargon. This page renders markdown, so you can format it and add images via the Media Library and links.
        </p>
        <p>No about page is found.</p>
        <button className="button button--full-major" type="button" onClick={props.onCreatePage}>Create a new about page</button>
      </div>
    );
  }

  return (
    <div>
      <h3 className="organization-layout__section-header">Organization About Page</h3>
      <p>
        This page is for you to describe the organization to the volunteers. Feel free to add detail, but try to avoid jargon. This page renders markdown, so you can format it and add images via the Media Library and links.
      </p>
      <FormContainer onSubmit={props.onSubmit} onReset={props.resetOrganizationPage}>
        <fieldset className="form__fieldset">
          <label htmlFor="content">
            About Page Content
            <br />
            <MarkdownEditor
              id="content"
              name="content"
              onChange={props.onTextAreaChange}
              project={props.organization}
              rows="20"
              value={props.pageContent}
            />
          </label>
        </fieldset>
      </FormContainer>
    </div>
  );
};

AboutPage.propTypes = {
  onCreatePage: PropTypes.func,
  onSubmit: PropTypes.func,
  onTextAreaChange: PropTypes.func,
  organization: organizationShape,
  organizationPage: organizationPageShape,
  pageContent: PropTypes.string,
  resetOrganizationPage: PropTypes.func
};

export default AboutPage;
