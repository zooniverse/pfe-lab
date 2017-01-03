import React from 'react';
import { Link, IndexLink } from 'react-router';
import isActive from '../../../lib/is-active';

/* eslint-disable react/prop-types */
const OrganizationsEditLayout = ({ children, navItems, organization, organizations }, context) => {
/* eslint-enable */

  // inject organization into children
  const wrappedChildren = React.Children.map(children, child =>
    React.cloneElement(child, { organization, organizations }),
  );

  const org = organization || {};

  const labPath = `/organizations/${org.id}`;
  return (
    <div>
      <aside>
        <nav>
          <ul>
            <li className={isActive(context.router, 'organizations') ? 'active' : null}>
              <IndexLink to={labPath}>Organization details</IndexLink>
            </li>
            {navItems.map(item => (
              <li key={item.label} className={isActive(context.router, item.to) ? 'active' : null} >
                <Link to={`${labPath}${item.to}`}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <section>{wrappedChildren}</section>
    </div>
  );
};

OrganizationsEditLayout.contextTypes = {
  router: React.PropTypes.object,
};

OrganizationsEditLayout.defaultProps = {
  navItems: [
    { to: '/about', label: 'About' },
    { to: '/collaborators', label: 'Collaborators' },
    { to: '/visibility', label: 'Visibility' },
  ],
};

export default OrganizationsEditLayout;
