import React from 'react';
// import { Link } from 'react-router';
import { loginToPanoptes } from '../../../services/panoptes';

const Landing = () =>
  <div className="landing">
    <div className="landing__hero">
      <h4>ZOOLOGOTYPE PH</h4>
      <h3 className="landing__title">Zooniverse Lab</h3>
      <p className="landing__tagline">Anyone can build a Zooniverse project. Just upload your data and choose the tasks you want the volunteers to do. To find out more, read our <a href="https://www.zooniverse.org/lab-how-to">How to Build a Project documentation</a>, or click the button below to get started.</p>
    </div>
    <div>
      <div className="landing__buttons">
        <button className="landing__button" onClick={loginToPanoptes}>Sign In</button>
        <br />
        <a className="landing__button" href="https://www.zooniverse.org/projects">Back to Projects</a>
      </div>
      <div className="landing__links">
        <p className="landing__links__heading">Quick Links</p>
        <a className="landing__links__link" href="https://www.zooniverse.org/help">Project Builder Help</a>
        <a className="landing__links__link" href="https://www.zooniverse.org/help/lab-policies">Project Builder Policies</a>
        <a className="landing__links__link" href="https://www.zooniverse.org/lab-best-practices/introduction">Best Practices Guide</a>
        <a className="landing__links__link" href="https://www.zooniverse.org/about/acknowledgements">Acknowledgements</a>
        <a className="landing__links__link" href="https://www.zooniverse.org/talk/18">Project Builder Talk</a>
        <a className="landing__links__link" href="https://www.zooniverse.org/help/glossary">Glossary</a>
      </div>
    </div>
  </div>;

export default Landing;
