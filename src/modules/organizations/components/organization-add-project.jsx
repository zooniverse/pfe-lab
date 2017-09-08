import React from 'react';
import ProjectSearch from '../../common/components/project-search';
import FormContainer from '../../common/containers/form-container';

const OrganizationAddProject = ({ value, onAdd, onChange, onReset }) =>
  (<div>
    <h3 className="organization-layout__section-header">Add projects to this organization</h3>
    <ul className="organization-layout__section-instructions">
      <li className="organization-layout__section-instructions--list-items">
        You must be a project&apos;s owner or collaborator to add a project to the organization.
      </li>
      <li className="organization-layout__section-instructions--list-items">
        You may wish to add other organization collaborators to a project,
        so that they can edit the project visibility, content, workflows&apos; status or other aspects.
      </li>
    </ul>
    <FormContainer
      className="organization-add-project"
      onReset={onReset}
      onSubmit={onAdd}
      submitLabel="Add project"
    >
      <ProjectSearch clearable={false} onChange={onChange} value={value} />
    </FormContainer>
  </div>);

OrganizationAddProject.propTypes = {
  onAdd: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onReset: React.PropTypes.func,
  value: React.PropTypes.string.isRequired,
};

export default OrganizationAddProject;
