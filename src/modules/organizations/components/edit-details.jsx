import React from 'react';

import { organizationShape } from '../model';

import bindInput from '../../common/containers/bind-input';

const EditDetails = ({ organization, updateOrganization }) => {
  if (!organization) {
    return (
      <div>Loading...</div>
    );
  }

  const fields = {};

  const collect = () => {
    const result = {};
    Object.keys(fields).forEach((fieldName) => {
      result[fieldName] = fields[fieldName].value;
    });
    return result;
  };

  const doUpdate = () => {
    const patch = collect();
    updateOrganization(patch);
  };

  const NameInput = bindInput(organization.display_name)(<input type="text" />);
  const DescriptionInput = bindInput(organization.description)(<input style={{ width: '500px' }} />);
  const LanguageInput = bindInput(organization.primary_language || '')(<input />);

  return (
    <div>
      <h2>{organization.display_name}</h2>
      <p><small>You are editing this organization</small></p>
      Name: <NameInput withRef={(n) => { fields.display_name = n; }} />
      <br />
      Description: <DescriptionInput withRef={(n) => { fields.description = n; }} />
      <br />
      Primary Language: <LanguageInput withRef={(n) => { fields.primary_language = n; }} />
      <button onClick={doUpdate}>click</button>
    </div>
  );
};

EditDetails.propTypes = {
  organization: organizationShape,
  updateOrganization: React.PropTypes.func,
};

export default EditDetails;
