import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { ZooniverseLogotype } from 'zooniverse-react-components';
import { loginToPanoptes } from '../../../services/panoptes';
import { config } from '../../../constants/config';

const SignedOut = () =>
  <div>
    <div className="landing__buttons">
      <button className="button button--full-teal landing__button" onClick={loginToPanoptes}>Sign In</button>
      <br />
      <a className="button button--full-teal landing__button" href={`${config.zooniverseURL}/projects`}>Back to Classifying</a>
    </div>
    <div className="landing__links-section">
      <p className="landing__links-heading">Quick Links</p>
      <a className="landing__link" href={`${config.zooniverseURL}/help`}>Project Builder Help</a>
      <a className="landing__link" href={`${config.zooniverseURL}/help/lab-policies`}>Project Builder Policies</a>
      <a className="landing__link" href={`${config.zooniverseURL}/lab-best-practices/introduction`}>Best Practices Guide</a>
      <a className="landing__link" href={`${config.zooniverseURL}/about/acknowledgements`}>Acknowledgements</a>
      <a className="landing__link" href={`${config.zooniverseURL}/talk/18`}>Project Builder Talk</a>
      <a className="landing__link" href={`${config.zooniverseURL}/help/glossary`}>Glossary</a>
    </div>
  </div>;

const SignedIn = () =>
  <div>
    <div className="landing__row">
      <div>
        <h4>Projects</h4>
        <p className="landing__paragraph">To build a project just upload your data and choose the tasks you want the volunteers to do. To find out more, read our <a href={`${config.zooniverseURL}/help`}>How to Build a Project documentation</a>, or click the button to get started.</p>
      </div>
      <div>
        <a href={`${config.zooniverseURL}/lab`} className="button button--full-teal landing__button">Build a Project</a>
      </div>
    </div>
    <div className="landing__row">
      <div>
        <h4>Organizations</h4>
        <p className="landing__paragraph">
          To build an organization, or collection of projects, enter some basic information and link your projects. To find out more, read our related blog post <a href="https://blog.zooniverse.org/2019/06/19/zooniverse-new-functionality-organizations/">&quot;Zooniverse New Functionality: Organizations&quot;</a>, or click the button to get started.
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
      <ZooniverseLogotype />
      <h3 className="landing__title">Zooniverse Lab</h3>
      <p className="landing__tagline">Anyone can build a Zooniverse project or organization.</p>
    </div>
    {userBoolean ? <SignedIn /> : <SignedOut />}
  </div>;

Landing.propTypes = {
  userBoolean: PropTypes.bool,
};

Landing.defaultProps = {
  userBoolean: false,
};

export default Landing;
