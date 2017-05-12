import React from 'react';
import { organizationPageShape } from '../model';

const AboutPageEditor = ({ createPage, organizationPage, saving, updateContent }) => {
  if (!organizationPage) {
    return (
      <div>
        <p>This page is for you to provide volunteers with additional information about your organization...</p>
        <button
          type="button"
          onClick={createPage}
        >
          Create About page
        </button>
      </div>
    );
  }

  const onChange = (page, event) => {
    updateContent(page, event.target.value);
  };

  return (
    <div>
      <p>
        In this section:<br />
        Header 1 will appear <strong>orange</strong>.<br />
        Headers 2 - 6 and hyperlinks will appear <strong>dark-blue</strong>.
      </p>
      <textarea
        rows="10"
        cols="50"
        value={organizationPage.content ? organizationPage.content : ''}
        onChange={onChange.bind(this, organizationPage)}
      />
      <p>{saving ? 'Saving...' : 'Saved'}</p>
    </div>
  );
};

AboutPageEditor.defaultProps = {
  organizationPage: {},
};

AboutPageEditor.propTypes = {
  createPage: React.PropTypes.func,
  organizationPage: organizationPageShape,
  saving: React.PropTypes.bool,
  updateContent: React.PropTypes.func,
};

export default AboutPageEditor;
