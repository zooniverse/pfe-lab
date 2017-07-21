import React from 'react';
import { Link } from 'react-router';

const OrganizationLayout = ({ children, navItems, organizationId }) => (
  <div className="organization-layout">
    <nav className="organization-layout__nav">
      <ul className="nav-list">
        <li><div className="nav-list-header">Organization #{organizationId}</div></li>
        <li>
          <Link
            to={`/organizations/${organizationId}`}
            className="view-org-button"
          >
            View Organization
          </Link>
        </li>
        {navItems.map(item => (
          <li key={item.label}>
            <Link
              to={`/organizations/${organizationId}/${item.to}`}
              className="nav-list__item"
              activeClassName="active"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>

    <section className="organization-layout__section">{children}</section>
  </div>
);

OrganizationLayout.propTypes = {
  children: React.PropTypes.node,
  navItems: React.PropTypes.arrayOf(React.PropTypes.object),
  organizationId: React.PropTypes.string,
};

OrganizationLayout.defaultProps = {
  children: null,
  navItems: [
    { to: 'edit', label: 'Edit' },
    { to: 'about', label: 'About' },
    { to: 'collaborators', label: 'Collaborators' },
    { to: 'projects', label: 'Projects' },
  ],
  organizationId: '',
};

export default OrganizationLayout;
