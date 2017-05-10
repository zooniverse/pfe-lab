import React from 'react';
import AboutPageEditorContainer from '../containers/about-page-editor-container';

const AboutTeam = () =>
  <div>
    <p>The site will show your team members and their roles to the side of the text.
    Additional team information may be provided below.</p>
    <AboutPageEditorContainer pageKey="team" />
  </div>;

export default AboutTeam;
