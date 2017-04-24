import React from 'react';
import { Link } from 'react-router';

import { organizationsShape, organizationShape } from '../model';

export const ListGroup = ({ organizations, showOwnerName, title }) =>
  <div>
    <h2 className="organizations-list__title">{title}</h2>
    <ul className="organizations-list__list">
      {organizations.map(organization => (
        <li key={organization.id} className="organizations-list__item">
          <div className="organizations-list__row">
            <Link to={`/organizations/${organization.id}`} className="organizations-list__edit organizations-list--action">
              {organization.avatar &&
                <img src={organization.avatar.src} alt="avatar" className="organizations-list__avatar" />}
              <div className="organizations-list__description">
                <strong>{organization.display_name}</strong>{' '}
                {showOwnerName &&
                  <small>{`by ${organization.links.owner.display_name}`}</small>}
              </div>
              <span className="organizations-list__icon">
                <i className="fa fa-pencil fa-fw" />
                <small>Edit</small>
              </span>
            </Link>
            <Link to={`/organizations/${organization.slug}`} className="organizations-list__icon organizations-list--action">
              <i className="fa fa-hand-o-right fa-fw" />
              <small>View</small>
            </Link>
          </div>
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
      <div className="organizations-list__button-container">
        <button
          type="button"
          className="button organizations-list__button--create"
          onClick={() => console.log('create an org!')}
        >
          Create a new organization
        </button>{' '}
        <Link to="/" className="button organizations-list__button--info">How-to</Link>{' '}
      </div>
      <hr />
      <ListGroup organizations={collaboratedOrganizations} showOwnerName={true} title={'Collaborations'} />
    </div>
  );
};

ListGroup.defaultProps = {
  showOwnerName: false,
};

ListGroup.propTypes = {
  organizations: organizationsShape,
  showOwnerName: React.PropTypes.bool,
  title: React.PropTypes.string,
};

OrganizationsList.propTypes = {
  collaboratedOrganizations: organizationsShape,
  ownedOrganizations: organizationsShape,
};

export default OrganizationsList;
