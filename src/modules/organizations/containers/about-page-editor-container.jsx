import React from 'react';
import { connect } from 'react-redux';

import { organizationShape, organizationPageShape } from '../model';
import AboutPageEditor from '../components/about-page-editor';
import { setOrganizationPage } from '../action-creators';

class AboutPageEditorContainer extends React.Component {
  constructor(props) {
    super(props);

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

  fetchPage(organization = this.props.organization, pageKey = this.props.pageKey) {
    if (!organization) {
      return;
    }

    // TODO configure API to accept url_key param on organization_pages end-point to return single page

    organization.get('pages')
      .catch((error) => { console.error(error); })
      .then((pages) => {
        const organizationPage = pages.filter(page => page.url_key === pageKey);
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
      <AboutPageEditor page={this.props.organizationPage} />
    );
  }
}

AboutPageEditorContainer.propTypes = {
  dispatch: React.PropTypes.func,
  pageKey: React.PropTypes.string,
  organization: organizationShape,
  organizationPage: organizationPageShape,
};

function mapStateToProps(state) {
  return {
    organization: state.organization,
    organizationPage: state.organizationPage,
  };
}

export default connect(mapStateToProps)(AboutPageEditorContainer);
