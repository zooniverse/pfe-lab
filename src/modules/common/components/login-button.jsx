import React from 'react';
import PropTypes from 'prop-types';

const LoginButton = ({ login }) =>
  <button type="submit" onClick={login}>Login</button>;

LoginButton.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginButton;
