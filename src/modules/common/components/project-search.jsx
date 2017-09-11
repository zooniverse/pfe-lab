import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import apiClient from 'panoptes-client/lib/api-client';

const ProjectSearch = ({ clearable, onChange, value }) => {
  const getOptions = (input) => {
    const query = {
      search: `%${input}%`,
      current_user_roles: !apiClient.params.admin ? ['collaborator', 'owner'] : null
    };

    return apiClient.type('projects').get(query, {
      page_size: 10,
    }).then((projects) => {
      const opts = projects.map(project => ({
        value: project.id,
        label: project.display_name,
      }));
      return { options: opts };
    });
  };

  return (
    <ReactSelect.Async
      autoload={false}
      className="project-search"
      clearable={clearable}
      multi={false}
      isLoading={true}
      loadOptions={getOptions}
      name="projectSearch"
      onChange={onChange}
      placeholder="Name:"
      searchPromptText="Search by name"
      value={value || ''}
    />
  );
};

ProjectSearch.propTypes = {
  clearable: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default ProjectSearch;
