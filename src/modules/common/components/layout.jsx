import React from 'react';
import { connect } from 'react-redux';
import SiteNav from './site-nav';
import SiteFooter from './site-footer';
import Landing from './landing';
import AdminOnly from './admin-only';

const Layout = ({ user, loginInitialized, children, adminMode }) =>
  <div className="layout">
    <header className="layout__header">
      <SiteNav />
    </header>

    {adminMode && (
      <div className="layout__admin-indicator" title="Admin mode on!"></div>
    )}

    <main className="layout__main">
      {(user && loginInitialized && children ? children : <Landing userBoolean={user !== null} />)}
    </main>

    <SiteFooter />
  </div>;

Layout.propTypes = {
  adminMode: React.PropTypes.bool,
  children: React.PropTypes.node,
  loginInitialized: React.PropTypes.bool,
  user: React.PropTypes.shape({ id: React.PropTypes.string }),
};

Layout.defaultProps = {
  loginInitialized: false,
  user: null,
};

function mapStateToProps(state, ownProps) { // eslint-disable-line no-unused-vars
  return {
    adminMode: state.adminMode,
    user: state.user,
    loginInitialized: state.initialized,
  };
}

export default connect(mapStateToProps)(Layout);
