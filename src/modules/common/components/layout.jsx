import React from 'react';
import { connect } from 'react-redux';
import SiteNav from './site-nav';
import SiteFooter from './site-footer';
import Landing from './landing';

const Layout = ({ user, loginInitialized, children }) =>
  <div className="layout">
    <header className="layout__header">
      <SiteNav />
    </header>

    <main className="layout__main">
      {(user && loginInitialized && children ? children : <Landing userBoolean={user !== null} />)}
    </main>

    <footer className="layout__footer">
      <SiteFooter />
    </footer>
  </div>;

Layout.propTypes = {
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
    user: state.user,
    loginInitialized: state.initialized,
  };
}

export default connect(mapStateToProps)(Layout);
