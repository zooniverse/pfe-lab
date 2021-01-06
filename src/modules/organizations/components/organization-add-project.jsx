import React from 'react';
import PropTypes from 'prop-types';
import ProjectSearch from '../../common/components/project-search';
import FormContainer from '../../common/containers/form-container';
import { config } from '../../../constants/config';

const OrganizationAddProject = ({ value, onAdd, onChange, onReset }) =>
  (<div>
    <h3 className="organization-layout__section-header">Add projects to this organization</h3>
    <FormContainer
      className="organization-add-project"
      onReset={onReset}
      onSubmit={onAdd}
      submitLabel="Add project"
    >
      <ProjectSearch clearable={false} onChange={onChange} value={value} />
    </FormContainer>
    <br />
    <strong>Instructions</strong>
    <ul className="organization-layout__section-instructions">
      <li className="organization-layout__section-instructions--list-items">
        You must be a project&apos;s owner or collaborator to add a project to the organization.
      </li>
      <li className="organization-layout__section-instructions--list-items">
        You may wish to add other organization collaborators to projects affiliated with the organization
        so that they can edit a project&apos;s visibility, content, workflows or other aspects.
      </li>
      <li className="organization-layout__section-instructions--list-items">
        Only the project collaborators can edit or view a project.
        Any organization collaborator can remove a project from the organization.
        Removing a project from the organization has no other effect on the project.
      </li>
      <li className="organization-layout__section-instructions--list-items">
        A LAUNCH APPROVED project is shown on the organization home page to all volunteers.
      </li>
      <li className="organization-layout__section-instructions--list-items">
        You are not a collaborator on a project with an UNKNOWN status.
        Contact the other organization collaborators to get access to this project.
      </li>
    </ul>
    <div>
      <a href={`${config.zooniverseURL}/lab`} className="button button--full-major">Build a Project</a>
    </div>
  </div>);

OrganizationAddProject.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onReset: PropTypes.func,
  value: PropTypes.string.isRequired,
};

export default OrganizationAddProject;
