import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { LoginButton, LogoutButton, UserMenu, UserNavigation } from 'zooniverse-react-components';
import Anchor from 'grommet/components/Anchor';
import { checkLoginUser, loginToPanoptes, logoutFromPanoptes } from '../../../services/panoptes';
import { config } from '../../../constants/config';

export class AuthContainer extends React.Component {
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
    let userMenuNavList;
    let userNavigationNavList;
    if (this.props.user && this.props.initialized) {
      const login = this.props.user.login;
      userMenuNavList = [
        <Anchor href={`${config.zooniverseURL}/users/${login}`}>Profile</Anchor>,
        <Anchor href={`${config.zooniverseURL}/settings`}>Settings</Anchor>,
        <Anchor href={`${config.zooniverseURL}/collections/${login}`}>Collections</Anchor>,
        <Anchor href={`${config.zooniverseURL}/favorites/${login}`}>Favorites</Anchor>,
        <LogoutButton logout={this.logout} />
      ];
      userNavigationNavList = [
        <Anchor className="zoo-header__link--small" href={`${config.zooniverseURL}/notifications`} label="Notifications" />,
        <Anchor className="zoo-header__link--small" href={`${config.zooniverseURL}/inbox`} label="Messages" />
      ];
    }

    return (this.props.user && this.props.initialized) ?
      <div>
        <UserNavigation userNavigationNavList={userNavigationNavList} />
        <UserMenu
          user={this.props.user}
          userMenuNavList={userMenuNavList}
        />
      </div> :
      <div>
        <LoginButton toggleModal={loginToPanoptes} />
      </div>;
  }
}

AuthContainer.propTypes = {
  dispatch: PropTypes.func,
  initialized: PropTypes.bool,
  user: PropTypes.shape({
    login: PropTypes.string
  }),
};

AuthContainer.defaultProps = {
  initialised: false,
  user: null,
};

function mapStateToProps(state) {
  return {
    initialized: state.initialized,
    user: state.user
  };
}

export default connect(mapStateToProps)(AuthContainer);
