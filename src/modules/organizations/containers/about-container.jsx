/* eslint-disable no-underscore-dangle */
import React from 'react';
import { connect } from 'react-redux';
import apiClient from 'panoptes-client/lib/api-client';

import { organizationShape, organizationPageShape } from '../model';
import { setCurrentOrganization, setOrganizationPage } from '../action-creators';
import AboutPage from '../components/about-page';

class AboutContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageContent: '',
      saving: false,
    };

    this.fetchPage = this.fetchPage.bind(this);
    this.createPage = this.createPage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updatePageContent = this.updatePageContent.bind(this);
    this.resetOrganizationPage = this.resetOrganizationPage.bind(this);
    this.onTextAreaChange = this.onTextAreaChange.bind(this);
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

  onTextAreaChange(event) {
    const pageContent = event.target.value;

    this.setState({ pageContent });
  }

  fetchPage(organization = this.props.organization) {
    if (!organization) {
      return;
    }

    organization.get('pages', { url_key: 'about' })
    .then((pages) => {
      if (pages.length > 0) {
        const aboutPage = pages[0];
        this.props.dispatch(setOrganizationPage(aboutPage));
        this.setState({ pageContent: aboutPage.content });
      }

      this.props.dispatch(setOrganizationPage({}));
    })
    .catch((error) => { console.error(error); });
  }

  onCreatePage() {
    const params = {
      organization_pages: {
        url_key: 'about',
        title: 'About',
        language: this.props.organization.primary_language,
      },
    };
    apiClient.post(this.props.organization._getURL('pages'), params)
      .then(([newPage]) => {
        this.props.dispatch(setOrganizationPage(newPage));
      })
      .catch((error) => { console.error(error); })
      .then(() => {
        this.props.organization.uncacheLink('pages');
        return this.props.organization.refresh();
      })
      .then(([organization]) => {
        this.props.dispatch(setCurrentOrganization(organization));
      });
  }

  onSubmit() {
    this.updatePageContent({ content: this.state.pageContent });
  }

  updatePageContent(patch) {
    this.props.organizationPage.update(patch).save()
    .catch((error) => { console.error(error); })
    .then((updatedPage) => {
      this.props.dispatch(setOrganizationPage(updatedPage));
    });
  }

  resetOrganizationPage() {
    this.setState({ pageContent: '' });
  }

  render() {
    return (
      <AboutPage
        onCreatePage={this.onCreatePage}
        onSubmit={this.onSubmit}
        onTextAreaChange={this.onTextAreaChange}
        organization={this.props.organization}
        organizationPage={this.props.organizationPage}
        pageContent={this.state.pageContent}
        resetOrganizationPage={this.resetOrganizationPage}
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

// TODO: GET request is not behaving as expected: https://github.com/zooniverse/Panoptes/issues/2318
