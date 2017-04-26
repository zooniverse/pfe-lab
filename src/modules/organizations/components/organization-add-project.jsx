import React from 'react';
import ProjectSearch from '../../common/components/project-search';
import FormContainer from '../../common/containers/form-container';

const OrganizationAddProject = ({ value, onAdd, onChange, onReset }) =>
  (<FormContainer
    className="organization-add-project"
    onReset={onReset}
    onSubmit={onAdd}
    submitLabel="Add project"
  >
    <ProjectSearch clearable={false} onChange={onChange} value={value} />
  </FormContainer>);

OrganizationAddProject.propTypes = {
  onAdd: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onReset: React.PropTypes.func,
  value: React.PropTypes.string.isRequired,
};

export default OrganizationAddProject;
