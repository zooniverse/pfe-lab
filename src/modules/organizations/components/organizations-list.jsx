import React from 'react';
import { Link } from 'react-router';
import ListGroup from './list-group';

import { organizationsShape } from '../model';

const OrganizationsList = ({ createOrganization, collaboratedOrganizations, ownedOrganizations }) => {
  if (!ownedOrganizations || !collaboratedOrganizations) {
    return (
      <div>Loading...</div>
    );
  }
  console.log('ownedOrganizations', ownedOrganizations)
  return (
    <div className="organizations-list">
      {ownedOrganizations.length > 0 &&
        <ListGroup organizations={ownedOrganizations} title={'Your Organizations'} />}
      <div className="organizations-list__button-container">
        <button
          type="button"
          className="button organizations-list__button--create"
          onClick={createOrganization}
        >
          Create a new organization
        </button>{' '}
        <Link to="/" className="button organizations-list__button--info">How-to</Link>{' '}
      </div>
      <hr />

      {collaboratedOrganizations.length > 0 &&
        <ListGroup organizations={collaboratedOrganizations} showOwnerName={true} title={'Collaborations'} />}
    </div>
  );
};

OrganizationsList.propTypes = {
  createOrganization: React.PropTypes.func,
  collaboratedOrganizations: organizationsShape,
  ownedOrganizations: organizationsShape,
};

export default OrganizationsList;
