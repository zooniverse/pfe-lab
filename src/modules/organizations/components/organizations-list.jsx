import React from 'react';
import { Link } from 'react-router';
import ListGroup from './list-group';

import { organizationsAvatarsShape, organizationsShape } from '../model';

const OrganizationsList = ({ createOrganization, collaboratedOrganizations, organizationsAvatars, ownedOrganizations }) => {
  if (!ownedOrganizations || !collaboratedOrganizations) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <div className="organizations-list">
      {ownedOrganizations.length > 0 &&
        <ListGroup organizations={ownedOrganizations} organizationsAvatars={organizationsAvatars} title={'Your Organizations'} />}
      <div className="organizations-list__button-container">
        <button
          type="button"
          className="button organizations-list__button--create"
          onClick={createOrganization}
        >
          Create a new organization
        </button>{' '}
        <Link to="/" className="button organizations-list__button--info">How-to</Link>{' '}
        <Link to="/" className="button organizations-list__button--info">Glossary</Link>{' '}
        <Link to="/" className="button organizations-list__button--info">Policies</Link>{' '}
        <Link to="/" className="button organizations-list__button--info">Best Practices</Link>{' '}
        <Link to="/" className="button organizations-list__button--info">Talk</Link>{' '}
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
  organizationsAvatars: organizationsAvatarsShape,
  ownedOrganizations: organizationsShape,
};

export default OrganizationsList;
