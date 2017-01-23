import React from 'react';

const Footer = () =>
  <footer className="site-footer">
    <div className="site-footer__upper">
      <div className="site-footer__section site-footer__brand">
        <a href="https://www.zooniverse.org">ZOOLOGOTYPE PH</a>
        <br />
      </div>

      <nav className="site-footer__section site-footer__nav-lists">
        <ul className="site-footer__nav-list">
          <li>
            <a href="https://www.zooniverse.org/projects">
              Projects
            </a>
          </li>
          <li>
            <a href="https://www.zooniverse.org/collections">
            Collections
            </a>
          </li>
          <li>
            <a href="https://www.zooniverse.org/lab">
              Build a Project
            </a>
          </li>
          <li>
            <a href="https://www.zooniverse.org/help">
              How To Build
            </a>
          </li>
          <li>
            <a href="https://www.zooniverse.org/help/lab-policies">
              Project Policies
            </a>
          </li>
          {process.env.NODE_ENV !== 'production' &&
            <li>
              <a href="https://www.zooniverse.org/dev/classifier">Dev Classifier</a>
            </li>}
        </ul>

        <ul className="site-footer__nav-list">
          <li>
            <a href="https://www.zooniverse.org/about">
              About Us
            </a>
          </li>
          <li>
            <a href="https://www.zooniverse.org/get-involved/education">
              Education
            </a>
          </li>
          <li>
            <a href="https://www.zooniverse.org/about/team">
              Our Team
            </a>
          </li>
          <li>
            <a href="https://www.zooniverse.org/about/publications">
              Publications
            </a>
          </li>
          <li>
            <a href="https://www.zooniverse.org/about/acknowledgements">
              Acknowledgements
            </a>
          </li>
          <li>
            <a href="https://www.zooniverse.org/about/contact">
              Contact Us
            </a>
          </li>
        </ul>

        <ul className="site-footer__nav-list">
          <li>
            <a href="https://www.zooniverse.org/talk">
              Zooniverse Talk
            </a>
          </li>
          <li>
            <a href="http://daily.zooniverse.org/" target="_blank" rel="noopener noreferrer">
              Daily Zooniverse
            </a>
          </li>
          <li>
            <a href="http://blog.zooniverse.org/" target="_blank" rel="noopener noreferrer">
              Blog
            </a>
          </li>
        </ul>

        <ul className="site-footer__nav-list site-footer__nav-list--social">
          <li>
            <a href="https://www.facebook.com/therealzooniverse" target="_blank" rel="noopener noreferrer">
              <i className="fa fa-facebook fa-fw" />
            </a>{' '}
          </li>
          <li>
            <a href="https://twitter.com/the_zooniverse" target="_blank" rel="noopener noreferrer">
              <i className="fa fa-twitter fa-fw" />
            </a>{' '}
          </li>
          <li>
            <a href="https://plus.google.com/+ZooniverseOrgReal" target="_blank" rel="noopener noreferrer">
              <i className="fa fa-google-plus fa-fw" />
            </a>{' '}
          </li>
        </ul>
      </nav>
    </div>

    <div className="site-footer__sole">
      <a href="https://www.zooniverse.org/privacy">
        Privacy Policy
      </a>{' '}
      <i className="fa fa-ellipsis-v fa-fw" />{' '}
      <a href="http://jobs.zooniverse.org/">
        Jobs
      </a>{' '}
      <i className="fa fa-ellipsis-v fa-fw" />{' '}
      <a href="https://status.zooniverse.org/">
        Status
      </a>{' '}
      <i className="fa fa-ellipsis-v fa-fw" />{' '}
      <a href="https://www.zooniverse.org/security">
        Security
      </a>
    </div>
  </footer>;

export default Footer;
