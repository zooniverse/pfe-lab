import React from 'react';
import { Link } from 'react-router';

const OrganizationLayout = ({ children, navItems, organizationId }) =>
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
    </aside>

    <section>{children}</section>
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
    { to: 'visibility', label: 'Visibility' },
  ],
};

export default OrganizationLayout;
