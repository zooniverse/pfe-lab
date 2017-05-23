import React from 'react';
import { MarkdownEditor } from 'markdownz';

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
        <p>No about page is found.</p>
        <button type="button" onClick={props.onCreatePage}>Create a new about page</button>
      </div>
    );
  }

  return (
    <div>
      <p>
        Instructions...
      </p>
      <FormContainer onSubmit={props.onSubmit} onReset={props.resetOrganizationPage}>
        <fieldset className="form__fieldset">
          <label className="form__label" htmlFor="content">
            About Page Content
            <br />
            <MarkdownEditor
              project={props.organization}
              className="form__markdown-editor--full"
              name="content"
              id="content"
              rows="20"
              value={props.pageContent}
              onChange={props.onTextAreaChange}
            />
          </label>
        </fieldset>
      </FormContainer>
    </div>
  );
};

AboutPage.propTypes = {
  onCreatePage: React.PropTypes.func,
  onSubmit: React.PropTypes.func,
  onTextAreaChange: React.PropTypes.func,
  organization: organizationShape,
  organizationPage: organizationPageShape,
  pageContent: React.PropTypes.string,
  resetOrganizationPage: React.PropTypes.func
};

export default AboutPage;
