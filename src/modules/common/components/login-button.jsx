import React from 'react';


const LoginButton = ({ login }) =>
  <button type="submit" onClick={login}>Login</button>;

LoginButton.propTypes = {
  login: React.PropTypes.func.isRequired,
};

export default LoginButton;
