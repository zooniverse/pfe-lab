import React from 'react';
import { Link } from 'react-router';

const OrganizationActionLink = ({ to, text, id }) => {
  if (!id) {
    return <li>{text}</li>;
  }

  return <li><Link to={`/organizations/${id}/${to}`}>{text}</Link></li>;
};

OrganizationActionLink.propTypes = {
  id: React.PropTypes.string,
  text: React.PropTypes.string.isRequired,
  to: React.PropTypes.string.isRequired,
};

export default OrganizationActionLink;
