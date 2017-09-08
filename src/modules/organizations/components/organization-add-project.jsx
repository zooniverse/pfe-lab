import React from 'react';
import ProjectSearch from '../../common/components/project-search';
import FormContainer from '../../common/containers/form-container';

const OrganizationAddProject = ({ value, onAdd, onChange, onReset }) =>
  (<div>
    <div className="organization-layout__section-header">Add projects to this organization</div>
    <ul className="organization-layout__section-instructions">
      <li className="organization-layout__section-instructions--list-items">You must be an organization owner or collaborater to add projects to an organization.</li>
      <li className="organization-layout__section-instructions--list-items">
        You may wish to add other organization collaborators or owners to a project,
        so that they can edit the organization&apos;s projects.
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
