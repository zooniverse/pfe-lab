import React from 'react';
import ResourcesList from '../../common/components/resources-list';

import { projectsShape } from '../../projects/model';

const OrganizationProjectsList = ({ projects, onRemove }) => {
  if (!projects || projects.length < 1) {
    return (<p>No projects associated with this organization</p>);
  }

  return (
    <div>
      <div className="organization-section-header">Affiliated Projects</div>
      <ul className="organization-section-instructions">
        <li>
          If you see CONTACT ORGANIZATION OWNER as the owner, contact the organization owner,
          or collaborators, to get access to this project.
        </li>
        <li>The visibility of each project is displayed to the right of the project&apos;s owner.</li>
        <li>Only the owner and collaborators can view a NOT PUBLICLY VISIBILE project.</li>
        <li>Anyone with the URL can access a PUBLICLY VISIBILE project.</li>
        <li>UNKNOWN indicates that you are not a collaborator or owner of this project.</li>
      </ul>
      <ResourcesList
        resources={projects}
        resourceType={'projects'}
        showOwnerName={true}
        showRemove={true}
        onRemove={onRemove}
        showStatus={true}
        title={'Project List'}
      />
    </div>
  );
};

OrganizationProjectsList.propTypes = {
  projects: projectsShape.isRequired,
  onRemove: React.PropTypes.func.isRequired,
};

export default OrganizationProjectsList;
