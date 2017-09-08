// A smart component that handles state for the LoginButton and LoggedInUser
// components. Stores state in Redux.

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { checkLoginUser, loginToPanoptes, logoutFromPanoptes } from '../../../services/panoptes';

import LoginButton from '../components/login-button';
import LogoutButton from '../components/logout-button';

class HeaderAuth extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    if (!this.props.initialized) {
      checkLoginUser(this.props.dispatch);
    }
  }

  logout() {
    logoutFromPanoptes(this.props.dispatch);
  }

  render() {
    return (this.props.user)
      ? <LogoutButton user={this.props.user} logout={this.logout} />
      : <LoginButton login={loginToPanoptes} />;
  }
}

HeaderAuth.propTypes = {
  user: PropTypes.shape({
    login: PropTypes.string
  }),
  initialized: PropTypes.bool,
  dispatch: PropTypes.func,
};

HeaderAuth.defaultProps = {
  user: null,
  initialized: false,
};

function mapStateToProps(state) {  // Listens for changes in the Redux Store
  return {
    user: state.user,
    initialized: state.initialized,
  };
}
export default connect(mapStateToProps)(HeaderAuth);  // Connects the Component to the Redux Store
