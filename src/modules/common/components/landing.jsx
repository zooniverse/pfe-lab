import React from 'react';
import { Link } from 'react-router';
import { loginToPanoptes } from '../../../services/panoptes';

const SignedOut = () =>
  <div>
    <div className="landing__buttons">
      <button className="button button--full-teal landing__button" onClick={loginToPanoptes}>Sign In</button>
      <br />
      <a className="button button--full-teal landing__button" href="https://www.zooniverse.org/projects">Back to Classifying</a>
    </div>
    <div className="landing__links-section">
      <p className="landing__links-heading">Quick Links</p>
      <a className="landing__link" href="https://www.zooniverse.org/help">Project Builder Help</a>
      <a className="landing__link" href="https://www.zooniverse.org/help/lab-policies">Project Builder Policies</a>
      <a className="landing__link" href="https://www.zooniverse.org/lab-best-practices/introduction">Best Practices Guide</a>
      <a className="landing__link" href="https://www.zooniverse.org/about/acknowledgements">Acknowledgements</a>
      <a className="landing__link" href="https://www.zooniverse.org/talk/18">Project Builder Talk</a>
      <a className="landing__link" href="https://www.zooniverse.org/help/glossary">Glossary</a>
    </div>
  </div>;

const SignedIn = () =>
  <div>
    <div className="landing__row">
      <div>
        <h4>Projects</h4>
        <p className="landing__row-description">To build a project just upload your data and choose the tasks you want the volunteers to do. To find out more, read our <a href="https://www.zooniverse.org/lab-how-to">How to Build a Project documentation</a>, or click the button to get started.</p>
      </div>
      <div>
        <a href="https://www.zooniverse.org/lab"className="button button--full-teal landing__button">Build a Project</a>
      </div>
    </div>
    <div className="landing__row">
      <div>
        <h4>Organizations</h4>
        <p className="landing__row-description">
          To build an organization, or collection of projects, [additional info goes here]. To find out more, read our <a href="">How to Build an Organization documentation</a>, or click the button to get started.
        </p>
      </div>
      <div>
        <Link to="organizations" className="button button--full-teal landing__button">Build an Organization</Link>
      </div>
    </div>
  </div>;

const Landing = ({ userBoolean }) =>
  <div className="landing">
    <div className="landing__hero">
      <h4>ZOOLOGOTYPE PH</h4>
      <h3 className="landing__title">Zooniverse Lab</h3>
      <p className="landing__tagline">Anyone can build a Zooniverse project or organization.</p>
    </div>
    {userBoolean ? <SignedIn /> : <SignedOut />}
  </div>;

Landing.propTypes = {
  userBoolean: React.PropTypes.bool,
};

Landing.defaultProps = {
  userBoolean: false,
};

export default Landing;
