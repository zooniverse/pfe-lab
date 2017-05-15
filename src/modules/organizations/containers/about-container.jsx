/* eslint-disable no-underscore-dangle */
import React from 'react';
import { connect } from 'react-redux';
import apiClient from 'panoptes-client/lib/api-client';
import { MarkdownEditor } from 'markdownz';

import FormContainer from '../../common/containers/form-container';
import { organizationShape, organizationPageShape } from '../model';
import { setCurrentOrganization, setOrganizationPage } from '../action-creators';

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

  createPage() {
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

  handleSubmit() {
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
    // TODO: separate out into component

    if (!this.props.organizationPage) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    }

    if (Object.keys(this.props.organizationPage).length === 0) {
      return (
        <div>
          <p>No about page is found.</p>
          <button type="button" onClick={this.createPage}>Create a new about page</button>
        </div>
      );
    }

    return (
      <div>
        <p>
          Instructions...
        </p>
        <FormContainer onSubmit={this.handleSubmit} onReset={this.resetOrganizationPage}>
          <fieldset className="form_fieldset">
            <label className="form_label" htmlFor="content">
              About Page Content
              <br />
              <MarkdownEditor
                project={this.props.organization}
                className="form__markdown-editor--full"
                name="content"
                id="content"
                rows="20"
                value={this.state.pageContent}
                onChange={this.onTextAreaChange}
              />
            </label>
          </fieldset>
        </FormContainer>
      </div>
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
