import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Notification from 'grommet/components/Notification';
import { AdminLayoutIndicator, ZooFooter, ZooHeader } from 'zooniverse-react-components';
import Landing from './landing';
import { setAppNotification } from '../action-creators';
import AdminContainer from '../containers/admin-container';
import AuthContainer from '../containers/auth-container';
import { LogoHomeLink, MainHeaderNavList } from './header-nav-items';

const Layout = props =>
  <div className="layout">
    {props.adminMode && <AdminLayoutIndicator />}

    <ZooHeader authContainer={<AuthContainer />} logoHomeLink={LogoHomeLink} mainHeaderNavList={MainHeaderNavList} />

    <main className="layout__main">
      {props.appNotification.status &&
        <Notification
          status={props.appNotification.status}
          message={props.appNotification.message}
          closer={true}
          onClose={() => { props.dispatch(setAppNotification({ message: null, status: null })); }}
        />}
      {(props.user && props.loginInitialized && props.children ?
        props.children : <Landing userBoolean={props.user !== null} />)}
    </main>

    <ZooFooter adminContainer={<AdminContainer />} />
  </div>;

Layout.propTypes = {
  adminMode: PropTypes.bool,
  appNotification: PropTypes.shape({
    message: PropTypes.string,
    status: PropTypes.string
  }),
  children: PropTypes.node,
  dispatch: PropTypes.func,
  loginInitialized: PropTypes.bool,
  user: PropTypes.shape({ id: PropTypes.string }),
};

Layout.defaultProps = {
  adminMode: false,
  appNotification: {
    message: null,
    status: null
  },
  loginInitialized: false,
  toggleAdminMode: () => {},
  user: null,
};

function mapStateToProps(state) {
  return {
    adminMode: state.adminMode,
    appNotification: state.appNotification,
    loginInitialized: state.initialized,
    user: state.user,
  };
}

export default connect(mapStateToProps)(Layout);
