import React from 'react';
import { connect } from 'react-redux';
import { Paginator } from 'zooniverse-react-components';

import { projectsShape } from '../../projects/model';
import { organizationShape } from '../model';

import OrganizationProjectsList from '../components/organization-projects-list';
import OrganizationAddProject from '../components/organization-add-project';

import { setOrganizationProjects, setCurrentOrganization } from '../action-creators';
import notificationHandler from '../../../lib/notificationHandler';

class ProjectsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      meta: null,
      projectToAdd: { value: '', label: '' },
    };

    this.addProject = this.addProject.bind(this);
    this.changeSelectedProject = this.changeSelectedProject.bind(this);
    this.getLinkedProjects = this.getLinkedProjects.bind(this);
    this.removeProject = this.removeProject.bind(this);
    this.resetProjectToAdd = this.resetProjectToAdd.bind(this);
  }

  componentDidMount() {
    this.getLinkedProjects();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.organization !== this.props.organization ||
      nextProps.location.query.page !== this.props.location.query.page) {
      this.getLinkedProjects(nextProps.organization, nextProps.location.query.page);
    }
  }

  componentWillUnmount() {
    this.props.dispatch(setOrganizationProjects([]));
  }

  getLinkedProjects(organization = this.props.organization, page = 1) {
    if (organization && organization.links.projects) {
      const query = { sort: 'display_name', page };

      // Isolate the project Ids associated with the organization
      const projectIds = organization.links.projects;

      organization.get('projects', query)
        .then((projects) => {
          this.setState({ meta: projects[0]._meta }); // eslint-disable-line no-underscore-dangle
          return projectIds.map((projectId) => {
            const project = projects.find(p => p.id === projectId);
            if (project) {
              return project;
            }
            return {
              description: 'Unknown project',
              display_name: `Project ${projectId}`,
              id: projectId,
              links: {
                owner: {
                  display_name: 'CONTACT ORGANIZATION OWNER'
                },
              },
            };
          });
        })
        .then(allProjects => this.props.dispatch(setOrganizationProjects(allProjects)))
        .catch((error) => {
          const notification = { status: 'critical', message: `${error.statusText}: ${error.message}` };
          notificationHandler(this.props.dispatch, notification);
        });
    }
  }

  addProject() {
    const id = this.state.projectToAdd.value;

    this.props.organization.addLink('projects', [id])
      .then(([organization]) => {
        this.props.dispatch(setCurrentOrganization(organization));
        this.getLinkedProjects(organization);
        this.resetProjectToAdd();
      }).catch((error) => {
        const notification = { status: 'critical', message: `${error.statusText}: ${error.message}` };

        notificationHandler(this.props.dispatch, notification);
      });
  }

  removeProject(id) {
    this.props.organization.removeLink('projects', [id])
      .then(([organization]) => {
        this.props.dispatch(setCurrentOrganization(organization));
        this.getLinkedProjects(organization);
        this.resetProjectToAdd();
      }).catch((error) => {
        const notification = { status: 'critical', message: `${error.statusText}: ${error.message}` };

        notificationHandler(this.props.dispatch, notification);
      }).then(() => {
        this.props.organization.uncacheLink('projects');
      });
  }

  changeSelectedProject(selectedProject) {
    const projectToAdd = selectedProject || { value: '', label: '' };
    this.setState({ projectToAdd });
  }

  resetProjectToAdd() {
    this.setState({ projectToAdd: { value: '', label: '' } });
  }

  render() {
    return (
      <div>
        <div className="organization-section-header">Affiliated Projects</div>
        <ul className="organization-section-instructions">
          <li >
            If you see CONTACT ORGANIZATION OWNER as the owner, contact the organization owner,
            or collaborators, to get access to this project.
          </li>
          <li>The visibility of each project is displayed to the right of the project&apos;s owner.</li>
          <li>Only the owner and collaborators can view a NOT PUBLICLY VISIBILE project.</li>
          <li>Anyone with the URL can access a PUBLICLY VISIBILE project.</li>
          <li>UNKNOWN indicates that you are not a collaborator or owner of this project.</li>
        </ul>
        <OrganizationProjectsList
          onRemove={this.removeProject}
          projects={this.props.organizationProjects}
        />
        {this.props.organizationProjects.length && this.state.meta &&
          (<Paginator
            page={this.state.meta.projects.page}
            pageCount={this.state.meta.projects.page_count}
            router={this.props.router}
          />)
        }
        <hr />
        <div className="organization-section-header">Add projects to this organization</div>
        <ul className="organization-section-instructions">
          <li>You must be an organization owner or collaborater to add projects to an organization.</li>
          <li>
            You may wish to add other organization collaborators or owners to a project,
            so that they can edit the organization&apos;s projects.
          </li>
        </ul>
        <OrganizationAddProject
          onAdd={this.addProject}
          onChange={this.changeSelectedProject}
          onReset={this.resetProjectToAdd}
          value={this.state.projectToAdd.value}
        />
      </div>
    );
  }
}

ProjectsContainer.defaultProps = {
  dispatch: () => {},
  location: {},
  organization: {},
  organizationProjects: [],
  router: {},
};

ProjectsContainer.propTypes = {
  dispatch: React.PropTypes.func,
  location: React.PropTypes.shape({
    query: React.PropTypes.shape({
      page: React.PropTypes.string,
    }),
  }),
  organization: organizationShape,
  organizationProjects: projectsShape,
  router: React.PropTypes.shape({
    push: React.PropTypes.func
  }),
};

function mapStateToProps(state) {
  return {
    organization: state.organization,
    organizationProjects: state.organizationProjects,
  };
}

export default connect(mapStateToProps)(ProjectsContainer);
