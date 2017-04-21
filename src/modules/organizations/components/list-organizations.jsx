import React from 'react';
import { Link } from 'react-router';

import { organizationsShape, organizationShape } from '../model';

export const ListRow = ({ organization }) =>
  <div className="listOrgs__row">
    <Link to={`/organizations/${organization.id}`} className="listOrgs__edit listOrgs--action">
      {organization.avatar &&
        <img src={organization.avatar.src} alt="avatar" className="listOrgs__avatar" />}
      <div className="listOrgs__description">
        <strong>{organization.display_name}</strong>{' '}
        {organization.ownerRole &&
          <small>
            by User #{organization.ownerRole.links.owner.id}
          </small>}
      </div>
      <span className="listOrgs__icon">
        <i className="fa fa-pencil fa-fw" />
        <small>Edit</small>
      </span>
    </Link>
    <Link to="/" className="listOrgs__icon listOrgs--action">
      <i className="fa fa-hand-o-right fa-fw" />
      <small>View</small>
    </Link>
  </div>;

export const ListGroup = ({ organizations, title }) =>
  <div>
    <p className="listOrgs__title">{title}</p>
    <ul className="listOrgs__list">
      {organizations.map(organization => (
        <li key={organization.id} className="listOrgs__item">
          <ListRow organization={organization} />
        </li>
      ))}
    </ul>
  </div>;

const ListOrganizations = ({ organizationsCollaborator, organizationsOwned }) => {
  if (!organizationsOwned || !organizationsCollaborator) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <div className="listOrgs">
      <ListGroup organizations={organizationsOwned} title={'Your Organizations'} />
      <p className="listOrgs__buttonContainer">
        <button
          type="button"
          className="button listOrgs__createButton"
          onClick={() => console.log('create an org!')}
        >
          Create a new project
        </button>{' '}
        <Link to="/" className="button listOrgs__infoButton">How-to</Link>{' '}
      </p>
      <hr />
      <ListGroup organizations={organizationsCollaborator} title={'Collaborations'} />
    </div>
  );
};

ListRow.propTypes = {
  organization: organizationShape,
};

ListGroup.propTypes = {
  organizations: organizationsShape,
  title: React.PropTypes.string,
};

ListOrganizations.propTypes = {
  organizationsCollaborator: organizationsShape,
  organizationsOwned: organizationsShape,
};

export default ListOrganizations;
