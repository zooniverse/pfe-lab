import React from 'react';
import PropTypes from 'prop-types';
import { config } from '../../../constants/config';
import ResourcesList from '../../common/components/resources-list';

import { organizationsAvatarsShape, organizationsShape } from '../model';

const OrganizationsList = ({
  createOrganization,
  collaboratedOrganizations,
  organizationsAvatars,
  ownedOrganizations
}) => {
  if (!ownedOrganizations || !collaboratedOrganizations) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <div className="resources-list">
      {ownedOrganizations.length > 0 &&
        <ResourcesList
          resources={ownedOrganizations}
          resourcesAvatars={organizationsAvatars}
          resourceType={'organizations'}
          showAvatar={true}
          title={'Your Organizations'}
        />}
      <div className="resources-list__button-container">
        <button
          type="button"
          className="button resources-list__button--create"
          onClick={createOrganization}
        >
          Create a new organization
        </button>{' '}
        <a href={`${config.zooniverseURL}/help`} className="button resources-list__button--info">How-to</a>{' '}
        <a href={`${config.zooniverseURL}/help/glossary`} className="button resources-list__button--info">Glossary</a>{' '}
        <a href={`${config.zooniverseURL}/help/lab-policies`} className="button resources-list__button--info">Policies</a>{' '}
        <a href={`${config.zooniverseURL}/lab-best-practices/introduction`} className="button resources-list__button--info">Best Practices</a>{' '}
        <a href={`${config.zooniverseURL}/talk/18`} className="button resources-list__button--info">Talk</a>{' '}
      </div>
      <hr />

      {collaboratedOrganizations.length > 0 &&
        <ResourcesList
          resources={collaboratedOrganizations}
          resourceType={'organizations'}
          showOwnerName={true}
          title={'Collaborations'}
        />}
    </div>
  );
};

OrganizationsList.propTypes = {
  createOrganization: PropTypes.func,
  collaboratedOrganizations: organizationsShape,
  organizationsAvatars: organizationsAvatarsShape,
  ownedOrganizations: organizationsShape,
};

export default OrganizationsList;
