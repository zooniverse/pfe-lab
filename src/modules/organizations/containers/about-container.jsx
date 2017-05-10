import React from 'react';
import { connect } from 'react-redux';

import apiClient from 'panoptes-client/lib/api-client';
import { organizationShape, organizationPageShape } from '../model';
import AboutPageEditor from '../components/about-page-editor';
import { setOrganizationPage } from '../action-creators';

class AboutContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      saving: null,
    };

    this.updateContent = this.updateContent.bind(this);
    this.fetchPage = this.fetchPage.bind(this);
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

  updateContent(page, newContent) {
    this.setState({ saving: page.id });

    page.update({ content: newContent }).save()
      .catch((error) => { console.error(error); })
      .then((updatedPage) => {
        this.props.dispatch(setOrganizationPage(updatedPage));
      })
      .then(() => {
        this.setState({ saving: null });
      });
  }

  fetchPage(organization = this.props.organization) {
    if (!organization) {
      return;
    }

    organization.get('pages')
      .catch((error) => { console.error(error); })
      .then((pages) => {
        if (pages.length === 0) {
          const params = {
            organization_pages: {
              url_key: 'about',
              title: 'About',
              language: organization.primary_language,
            },
          };
          apiClient.post(organization._getURL('pages'), params)
            .catch((error) => { console.error(error); })
            .then((newPage) => {
              this.props.dispatch(setOrganizationPage(newPage[0]));
            });
        }
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

  render() {
    return (
      <AboutPageEditor
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
