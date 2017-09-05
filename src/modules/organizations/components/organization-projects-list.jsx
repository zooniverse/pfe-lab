import React from 'react';
import ResourcesList from '../../common/components/resources-list';

import { projectsShape } from '../../projects/model';

const OrganizationProjectsList = ({ projects, onRemove }) => {
  if (!projects || projects.length < 1) {
    return (<p>No projects associated with this organization</p>);
  }

  return (
    <ResourcesList
      resources={projects}
      resourceType={'projects'}
      showOwnerName={true}
      showRemove={true}
      onRemove={onRemove}
      showStatus={true}
      // TODO: confer with Mark about removing title={'Project List'}
    />
  );
};

OrganizationProjectsList.propTypes = {
  projects: projectsShape.isRequired,
  onRemove: React.PropTypes.func.isRequired,
};

export default OrganizationProjectsList;
