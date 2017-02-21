import React from 'react';
import { Link } from 'react-router';

import { organizationsShape } from '../model';

const ListOrganizations = ({ ownedOrganizations, collaboratorOrganizations }) => {
  if (!ownedOrganizations || !collaboratorOrganizations) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <div>
      <h2>Organizations</h2>
      <h3>Owned</h3>
      <dl>
        { ownedOrganizations.map(organization => (
          <span key={organization.id}>
            <dt><Link to={`/organizations/${organization.id}`}>{organization.display_name}</Link></dt>
            <dd>{organization.description}</dd>
            <dd>
              <img alt="test" src={organization.avatar.src} />
            </dd>
          </span>
        ))}
      </dl>
      <h3>Collaborator</h3>
      <dl>
        { collaboratorOrganizations.map(organization => (
          <span key={organization.id}>
            <dt><Link to={`/organizations/${organization.id}`}>{organization.display_name}</Link></dt>
            <dd>{organization.description}</dd>
            <dd>by User #{organization.ownerRole.links.owner.id}</dd>
          </span>
        ))}
      </dl>
    </div>
  );
};

ListOrganizations.propTypes = {
  ownedOrganizations: organizationsShape,
  collaboratorOrganizations: organizationsShape,
};

export default ListOrganizations;
