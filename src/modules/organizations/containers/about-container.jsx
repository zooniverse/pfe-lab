import React from 'react';
import { connect } from 'react-redux';

import apiClient from 'panoptes-client/lib/api-client';
import { organizationShape, organizationPageShape } from '../model';
import AboutPageEditor from '../components/about-page-editor';
import { setCurrentOrganization, setOrganizationPage } from '../action-creators';

class AboutContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      saving: false,
    };

    this.createPage = this.createPage.bind(this);
    this.fetchPage = this.fetchPage.bind(this);
    this.updateContent = this.updateContent.bind(this);
  }

  componentDidMount() {
    this.fetchPage();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.organization !== this.props.organization) {
      this.fetchPage(nextProps.organization);
    }
  }

  componentWillUnmount() {
    this.props.dispatch(setOrganizationPage(null));
  }

  fetchPage(organization = this.props.organization) {
    if (!organization) {
      return;
    }

    organization.get('pages')
    .catch((error) => { console.error(error); })
    .then((pages) => {
      const organizationPage = pages.filter(page => page.url_key === 'about');
      if (organizationPage.length === 1) {
        return organizationPage[0];
      }
      return null;
    })
    .then((page) => {
      this.props.dispatch(setOrganizationPage(page));
    });
  }

  createPage() {
    const params = {
      organization_pages: {
        url_key: 'about',
        title: 'About',
        language: this.props.organization.primary_language,
      },
    };
    apiClient.post(this.props.organization._getURL('pages'), params)
      .catch((error) => { console.error(error); })
      .then(([newPage]) => {
        this.props.dispatch(setOrganizationPage(newPage));
      })
      .then(() => {
        this.props.organization.uncacheLink('pages');
        return this.props.organization.refresh();
      })
      .then(([organization]) => {
        this.props.dispatch(setCurrentOrganization(organization));
      });
  }

  updateContent(page, newContent) {
    this.setState({ saving: true });

    page.update({ content: newContent }).save()
    .catch((error) => { console.error(error); })
    .then((updatedPage) => {
      this.props.dispatch(setOrganizationPage(updatedPage));
    })
    .then(() => {
      this.setState({ saving: false });
    });
  }

  render() {
    return (
      <AboutPageEditor
        createPage={this.createPage}
        organizationPage={this.props.organizationPage}
        saving={this.state.saving}
        updateContent={this.updateContent}
      />
    );
  }
}

AboutContainer.propTypes = {
  dispatch: React.PropTypes.func,
  organization: organizationShape,
  organizationPage: organizationPageShape,
};

function mapStateToProps(state) {
  return {
    organization: state.organization,
    organizationPage: state.organizationPage,
  };
}

export default connect(mapStateToProps)(AboutContainer);
