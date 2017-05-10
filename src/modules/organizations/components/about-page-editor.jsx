import React from 'react';
import { organizationPageShape } from '../model';

const AboutPageEditor = ({ page }) => {
  if (!page) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>Enter content here:</p>
      <textarea value={page.content} />
    </div>
  );
};

AboutPageEditor.defaultProps = {
  page: {},
};

AboutPageEditor.propTypes = {
  page: organizationPageShape,
};

export default AboutPageEditor;
