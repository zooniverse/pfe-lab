import React from 'react';
import { Link } from 'react-router';

const ListOrganizations = ({ organizations }) => {
  console.log('orgs', organizations);
  console.log('args', arguments);
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

export default ListOrganizations;
