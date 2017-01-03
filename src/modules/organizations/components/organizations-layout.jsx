import React from 'react';
import { Link } from 'react-router';
import OrganizationActionLink from './organization-action-link';

/* eslint-disable react/prop-types */
// i really don't wanna figure out how to give valid propTypes for builtins like children
const OrganizationsLayout = ({ children, navItems, organization, organizations }) => {
/* eslint-enable */

  // inject organization into children
  const wrappedChildren = React.Children.map(children, child =>
    React.cloneElement(child, { organization, organizations }),
  );

  const org = organization || {};

  return (
    <div>
      <aside>
        <nav>
          <h4>Navigation</h4>
          <ul>
            <li><Link to="">Home</Link></li>
          </ul>
          <h4>Organizations</h4>
          <ul>
            <li><Link to="/organizations">Organizations List</Link></li>
            {navItems.map(item =>
              <OrganizationActionLink key={item.to} to={item.to} id={org.id} text={item.label} />,
            )}
          </ul>
        </nav>
      </aside>

      <section>{wrappedChildren}</section>
    </div>
  );
};

OrganizationsLayout.contextTypes = {
  router: React.PropTypes.object,
};

OrganizationsLayout.defaultProps = {
  navItems: [
    { to: '', label: 'Edit' },
    { to: 'about', label: 'About' },
    { to: 'collaborators', label: 'Collaborators' },
    { to: 'visibility', label: 'Visibility' },
  ],
};

export default OrganizationsLayout;
