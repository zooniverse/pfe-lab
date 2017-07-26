import React from 'react';

import { projectsShape } from '../../projects/model';

const OrganizationProjectsList = ({ projects, onRemove }) => {
  if (!projects || projects.length < 1) {
    return (<p>No projects associated with this organization</p>);
  }

  return (
    <ul className="organization-projects-list">
      {projects.map(project => (
        <li key={project.id} className="organization-project-item">
          <strong className="organization-project-item__name">{project.display_name}</strong>
          <button type="button" onClick={onRemove.bind(null, project.id)} className="organization-project-item__button--remove">
            x
          </button>
        </li>
      ))}
    </ul>
  );
};

OrganizationProjectsList.propTypes = {
  projects: projectsShape.isRequired,
  onRemove: React.PropTypes.func.isRequired,
};

export default OrganizationProjectsList;
