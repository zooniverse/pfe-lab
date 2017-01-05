import React from 'react';
import { Link } from 'react-router';
import NavItems from './nav-items';
import HeaderAuth from '../containers/header-auth';

class Header extends React.Component {
  constructor() {
    super();

    this.renderNav = this.renderNav.bind(this);
    this.renderNavItem = this.renderNavItem.bind(this);
  }

  renderNav() {
    let nav = null;
    if (this.props.navItems) {
      nav = (
        <nav className="site-nav">
          <a href="https://www.zooniverse.org/" className="site-nav__link">ZOO-LOGO-PH</a>
          <ul className="site-nav__main-links">
            {this.props.navItems.map(this.renderNavItem)}
          </ul>
          <HeaderAuth />
        </nav>
      );
    }
    return nav;
  }

  renderNavItem(item) {
    if (item.to.match(/^https?:/ig)) {
      return (
        <li key={item.label}>
          <a href={item.to} className="site-nav__link">{item.label}</a>
        </li>
      );
    }
    return (
      <li key={item.label}>
        <Link to={item.to} className="site-nav__link" activeClassName="site-nav__link--active">
          {item.label}
        </Link>
      </li>
    );
  }

  render() {
    return (
      <header className="site-header">
        {this.renderNav()}
      </header>
    );
  }
}

Header.propTypes = {
  navItems: React.PropTypes.arrayOf(React.PropTypes.object),
};

Header.defaultProps = {
  navItems: NavItems,
};

export default Header;
