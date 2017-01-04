import React from 'react';
import { Link } from 'react-router';

import { organizationsShape } from '../model';

const ListOrganizations = ({ organizations }) => {
  if (!organizations) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <div>
      <h2>Organizations</h2>
      <dl>
        { organizations.map(organization => (
          <span key={organization.id}>
            <dt><Link to={`/organizations/${organization.id}`}>{organization.display_name}</Link></dt>
            <dd>{organization.description}</dd>
          </span>
        ))}
      </dl>
    </div>
  );
};

ListOrganizations.propTypes = { organizations: organizationsShape };

export default ListOrganizations;
