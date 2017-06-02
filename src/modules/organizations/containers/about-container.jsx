/* eslint-disable no-underscore-dangle */
import React from 'react';
import { connect } from 'react-redux';
import apiClient from 'panoptes-client/lib/api-client';

import { organizationShape, organizationPageShape } from '../model';
import { setCurrentOrganization, setOrganizationPage } from '../action-creators';
import AboutPage from '../components/about-page';

export class AboutContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageContent: '',
      saving: false,
    };

    this.fetchPage = this.fetchPage.bind(this);
    this.onCreatePage = this.onCreatePage.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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

  fetchPage(organization = this.props.organization) {
    if (!organization) {
      return;
    }

    organization.get('pages', { url_key: 'about' })
    .then(([aboutPage]) => {
      if (!aboutPage) {
        this.props.dispatch(setOrganizationPage({}));
      } else {
        this.props.dispatch(setOrganizationPage(aboutPage));
        this.setState({ pageContent: aboutPage.content });
      }
    })
    .catch((error) => { console.error(error); });
  }

  resetOrganizationPage() {
    this.setState({ pageContent: this.props.organizationPage.content });
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
