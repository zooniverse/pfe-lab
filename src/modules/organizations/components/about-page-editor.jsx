import React from 'react';
import { organizationPageShape } from '../model';

const AboutPageEditor = ({ organizationPage, saving, updateContent }) => {
  if (!organizationPage) {
    return <div>Loading...</div>;
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
      <p>{(saving !== null) ? 'Saving...' : 'Saved'}</p>
    </div>
  );
};

AboutPageEditor.defaultProps = {
  organizationPage: {},
};

AboutPageEditor.propTypes = {
  organizationPage: organizationPageShape,
  saving: React.PropTypes.string,
  updateContent: React.PropTypes.func,
};

export default AboutPageEditor;
