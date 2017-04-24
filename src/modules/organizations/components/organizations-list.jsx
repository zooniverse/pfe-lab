import React from 'react';
import { Link } from 'react-router';

import { organizationsShape, organizationShape } from '../model';

export const ListRow = ({ organization }) =>
  <div className="organizations-list__row">
    <Link to={`/organizations/${organization.id}`} className="organizations-list__edit organizations-list--action">
      {organization.avatar &&
        <img src={organization.avatar.src} alt="avatar" className="organizations-list__avatar" />}
      <div className="organizations-list__description">
        <strong>{organization.display_name}</strong>{' '}
        {organization.ownerRole &&
          <small>{`by User ${organization.ownerRole.links.owner.id}`}</small>}
      </div>
      <span className="organizations-list__icon">
        <i className="fa fa-pencil fa-fw" />
        <small>Edit</small>
      </span>
    </Link>
    <Link to="/" className="organizations-list__icon organizations-list--action">
      <i className="fa fa-hand-o-right fa-fw" />
      <small>View</small>
    </Link>
  </div>;

export const ListGroup = ({ organizations, title }) =>
  <div>
    <p className="organizations-list__title">{title}</p>
    <ul className="organizations-list__list">
      {organizations.map(organization => (
        <li key={organization.id} className="organizations-list__item">
          <ListRow organization={organization} />
        </li>
      ))}
    </ul>
  </div>;

const OrganizationsList = ({ collaboratedOrganizations, ownedOrganizations }) => {
  if (!ownedOrganizations || !collaboratedOrganizations) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <div className="organizations-list">
      <ListGroup organizations={ownedOrganizations} title={'Your Organizations'} />
      <p className="organizations-list__buttonContainer">
        <button
          type="button"
          className="button organizations-list__createButton"
          onClick={() => console.log('create an org!')}
        >
          Create a new organization
        </button>{' '}
        <Link to="/" className="button organizations-list__infoButton">How-to</Link>{' '}
      </p>
      <hr />
      <ListGroup organizations={collaboratedOrganizations} title={'Collaborations'} />
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

OrganizationsList.propTypes = {
  collaboratedOrganizations: organizationsShape,
  ownedOrganizations: organizationsShape,
};

export default OrganizationsList;
