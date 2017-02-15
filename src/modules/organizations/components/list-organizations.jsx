import React from 'react';
import { Link } from 'react-router';

import { organizationsShape } from '../model';

const ListOrganizations = ({ organizations, organizationRoles }) => {
  if (!organizations || !organizationRoles) {
    return (
      <div>Loading...</div>
    );
  }

  function isRole(orgRole, roleFilter) {
    return orgRole.roles.indexOf(roleFilter) !== -1;
  }

  const ownedOrgIds = organizationRoles
    .filter(orgRole => isRole(orgRole, 'owner'))
    .map(orgRole => orgRole.links.organization);
  const collabOrgIds = organizationRoles
    .filter(orgRole => isRole(orgRole, 'collaborator'))
    .map(orgRole => orgRole.links.organization);

  const ownedOrgs = organizations.filter(org => ownedOrgIds.indexOf(org.id) !== -1);
  const collabOrgs = organizations.filter(org => collabOrgIds.indexOf(org.id) !== -1);

  return (
    <div>
      <h2>Organizations</h2>
      <h3>Owned</h3>
      <dl>
        { ownedOrgs.map(organization => (
          <span key={organization.id}>
            <dt><Link to={`/organizations/${organization.id}`}>{organization.display_name}</Link></dt>
            <dd>{organization.description}</dd>
          </span>
        ))}
      </dl>
      <h3>Collaborator</h3>
      <dl>
        { collabOrgs.map(organization => (
          <span key={organization.id}>
            <dt><Link to={`/organizations/${organization.id}`}>{organization.display_name}</Link></dt>
            <dd>{organization.description}</dd>
          </span>
        ))}
      </dl>
    </div>
  );
};

ListOrganizations.propTypes = {
  organizations: organizationsShape,
  organizationRoles: React.PropTypes.arrayOf(React.PropTypes.object),
};

export default ListOrganizations;
