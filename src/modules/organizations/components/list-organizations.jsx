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
      <div>
        <h3>
          <strong>Your organizations</strong>
        </h3>
        <ul>
          {ownedOrganizations.map(organization => (
            <li key={organization.id}>
              <div>
                <Link to="/">
                  <img src={organization.avatar.src} alt="" />
                  <div>
                    <strong>{organization.display_name}</strong>
                  </div>
                  <span>
                    <i className="fa fa-pencil fa-fw" />
                    <small>Edit</small>
                  </span>
                </Link>
                <Link to="/" className="">
                  <i className="fa fa-hand-o-right fa-fw" />
                  <small>View</small>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <h3>Collaborations</h3>
      <dl>
        {collaboratorOrganizations.map(organization => (
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
