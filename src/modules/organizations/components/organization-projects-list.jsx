import React from 'react';
import ResourcesList from '../../common/components/resources-list';

import { projectsShape } from '../../projects/model';

const OrganizationProjectsList = ({ projects, onRemove }) => {
  if (!projects || projects.length < 1) {
    return (<p>No projects associated with this organization</p>);
  }

  return (
    <div>
      <h3 className="organization-layout__section-header">Affiliated Projects</h3>
      <hr />
      <ResourcesList
        resources={projects}
        resourceType={'projects'}
        showOwnerName={true}
        showRemove={true}
        onRemove={onRemove}
        showStatus={true}
      />
    </div>
  );
};

OrganizationProjectsList.propTypes = {
  projects: projectsShape.isRequired,
  onRemove: React.PropTypes.func.isRequired,
};

export default OrganizationProjectsList;
