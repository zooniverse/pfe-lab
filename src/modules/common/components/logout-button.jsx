import React from 'react';
import PropTypes from 'prop-types';

const LogoutButton = ({ logout, user }) =>
  <div className="logout-button">
    <span>{user.display_name}</span>
    <button type="submit" style={{ marginLeft: '1em' }} onClick={logout}>Log out</button>
  </div>;

LogoutButton.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.shape({ credited_name: PropTypes.string }).isRequired,
};

export default LogoutButton;
