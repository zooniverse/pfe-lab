import React from 'react';
import { connect } from 'react-redux';

import apiClient from 'panoptes-client/lib/api-client';
import { projectsShape } from '../../projects/model';

import OrganizationProjectsList from '../components/organization-projects-list';
import OrganizationAddProject from '../components/organization-add-project';
import SectionTitle from '../../common/components/section-title';

import { addOrganizationProject, removeOrganizationProject, setOrganizationProjects } from '../action-creators';

class VisibilityContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      projectToAdd: { value: '', label: '' },
    };

    this.addProject = this.addProject.bind(this);
    this.changeSelectedProject = this.changeSelectedProject.bind(this);
    this.removeProject = this.removeProject.bind(this);
  }

  componentDidMount() {
    apiClient.type('organizations').get(this.props.organizationId).get('projects').then((projects) => {
      this.props.dispatch(setOrganizationProjects(projects));
    });
  }

  addProject() {
    const id = this.state.projectToAdd.value;
    apiClient.type('organizations')
      .get(this.props.organizationId)
      .addLink('projects', [id])
      .then(() => apiClient.type('projects').get(id))
      .then((project) => {
        this.props.dispatch(addOrganizationProject(project));
      });
  }

  removeProject(id) {
    apiClient.type('organizations')
      .get(this.props.organizationId)
      .removeLink('projects', [id])
      .then(() => this.props.dispatch(removeOrganizationProject(id)));
  }

  changeSelectedProject(params) {
    this.setState({ projectToAdd: params });
  }

  render() {
    return (
      <div>
        <SectionTitle message="Affiliated Projects" />
        <OrganizationProjectsList
          projects={this.props.organizationProjects}
          onRemove={this.removeProject}
        />
        <OrganizationAddProject
          value={this.state.projectToAdd.value}
          onChange={this.changeSelectedProject}
          onAdd={this.addProject}
        />
      </div>
    );
  }
}

VisibilityContainer.propTypes = {
  dispatch: React.PropTypes.func,
  organizationId: React.PropTypes.string,
  organizationProjects: projectsShape,
};

function mapStateToProps(state) {
  return {
    organization: state.organization,
    organizationProjects: state.organizationProjects,
  };
}

export default connect(mapStateToProps)(VisibilityContainer);