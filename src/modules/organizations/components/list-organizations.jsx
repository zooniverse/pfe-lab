import React from 'react';
import { Link } from 'react-router';

import { organizationsShape, organizationShape } from '../model';

const ListRow = ({ organization }) =>
  <div className="list__row">
    <Link to={`/organizations/${organization.id}`} className="list__edit list--action">
      {organization.avatar &&
        <img src={organization.avatar.src} alt="avatar" className="list__avatar" />}
      <div className="list__description">
        <strong>{organization.display_name}</strong>{' '}
        {organization.ownerRole &&
          <small>
            by User #{organization.ownerRole.links.owner.id}
          </small>}
      </div>
      <span className="list__icon">
        <i className="fa fa-pencil fa-fw" />
        <small>Edit</small>
      </span>
    </Link>
    <Link to="/" className="list__icon list--action">
      <i className="fa fa-hand-o-right fa-fw" />
      <small>View</small>
    </Link>
  </div>;

const ListGroup = ({ organizations, title }) =>
  <div>
    <p className="list__title">{title}</p>
    <ul className="list__list">
      {organizations.map(organization => (
        <li key={organization.id} className="list__item">
          <ListRow organization={organization} />
        </li>
      ))}
    </ul>
  </div>;

const ListOrganizations = ({ ownedOrganizations, collaboratorOrganizations }) => {
  if (!ownedOrganizations || !collaboratorOrganizations) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <div className="list">
      <ListGroup organizations={ownedOrganizations} title={'Your Organizations'} />
      <p className="list__button-container">
        <button
          type="button"
          className="button list__create-button"
          onClick={() => console.log('create an org!')}
        >
          Create a new project
        </button>{' '}
        <Link to="/" className="button list__info-button">How-to</Link>{' '}
      </p>
      <hr />
      <ListGroup organizations={collaboratorOrganizations} title={'Collaborations'} />
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
  ownedOrganizations: organizationsShape,
  collaboratorOrganizations: organizationsShape,
};

export default ListOrganizations;
