import React from 'react';
import { Link } from 'react-router';

const OrganizationLayout = ({ children, deletionInProgress, deleteOrganization, navItems, organizationId }) =>
  <div className="content-section">
    <aside>
      <nav>
        <h4>Navigation</h4>
        <ul className="organizationsLinks">
          {navItems.map(item =>
            <li key={item.label}>
              <Link to={`/organizations/${organizationId}/${item.to}`}>
                {item.label}
              </Link>
            </li>,
          )}
        </ul>
      </nav>
      <button
        type="button"
        className="button button--full-alert"
        disabled={deletionInProgress}
        onClick={deleteOrganization}
      >
        Delete this organization
      </button>
    </aside>

    <section>{children}</section>
  </div>;

OrganizationLayout.propTypes = {
  children: React.PropTypes.node,
  deleteOrganization: React.PropTypes.func,
  deletionInProgress: React.PropTypes.bool,
  navItems: React.PropTypes.arrayOf(React.PropTypes.object),
  organizationId: React.PropTypes.string,
};

OrganizationLayout.defaultProps = {
  deleteOrganization: () => {},
  deletionInProgress: false,
  navItems: [
    { to: '', label: 'Edit' },
    { to: 'about', label: 'About' },
    { to: 'collaborators', label: 'Collaborators' },
    { to: 'projects', label: 'Projects' },
  ],
};

export default OrganizationLayout;
