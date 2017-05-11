import React from 'react';
import { Link } from 'react-router';

const OrganizationLayout = ({ children, navItems, organizationId }) =>
  <div className="organization-layout">
    <nav className="organization-layout__nav">
      <ul className="nav-list">
        {navItems.map(item =>
          <li key={item.label} className="nav-list__item">
            <Link to={`/organizations/${organizationId}/${item.to}`}>
              {item.label}
            </Link>
          </li>,
        )}
      </ul>
    </nav>

    <section className="organization-layout__section">{children}</section>
  </div>;

OrganizationLayout.propTypes = {
  children: React.PropTypes.node,
  navItems: React.PropTypes.arrayOf(React.PropTypes.object),
  organizationId: React.PropTypes.string,
};

OrganizationLayout.defaultProps = {
  navItems: [
    { to: '', label: 'Edit' },
    { to: 'about', label: 'About' },
    { to: 'collaborators', label: 'Collaborators' },
    { to: 'projects', label: 'Projects' },
  ],
};

export default OrganizationLayout;
