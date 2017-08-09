import React from 'react';
import { Link } from 'react-router';

const OrganizationLayout = ({ children, deleteOrganization, deletionInProgress, navItems, organizationId }) => (
  <div className="organization-layout">
    <nav className="organization-layout__nav">
      <ul className="nav-list">
        <li>
          <div className="nav-list-header">Organization #{organizationId}</div>
        </li>
        <li>
          <Link
            to={`/organizations/${organizationId}`}
            className="button button--wide nav-button nav-button--view"
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
      <br />
      <div className="form__label">Other Actions</div>
      <button
        type="button"
        className="button nav-button nav-button--delete"
        disabled={deletionInProgress}
        onClick={deleteOrganization}
      >
        Delete this organization
      </button>
    </nav>

    <section className="organization-layout__section">{children}</section>
  </div>
);

OrganizationLayout.propTypes = {
  children: React.PropTypes.node,
  deleteOrganization: React.PropTypes.func,
  deletionInProgress: React.PropTypes.bool,
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
