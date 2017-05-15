/* eslint-disable no-underscore-dangle */
import React from 'react';
import { connect } from 'react-redux';
import apiClient from 'panoptes-client/lib/api-client';

import bindInput from '../../common/containers/bind-input';
import FormContainer from '../../common/containers/form-container';
import CharLimit from '../../common/components/char-limit';
import { organizationShape, organizationPageShape } from '../model';
import { setCurrentOrganization, setOrganizationPage } from '../action-creators';

class AboutContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      saving: false,
    };

    this.fetchPage = this.fetchPage.bind(this);
    this.createPage = this.createPage.bind(this);
    this.collectValues = this.collectValues.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updatePageContent = this.updatePageContent.bind(this);
    this.resetOrganizationPage = this.resetOrganizationPage.bind(this);
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

  collectValues() {
    const result = {};
    Object.keys(this.fields).forEach((fieldName) => {
      result[fieldName] = this.fields[fieldName].value();
    });
    return result;
  }

  handleSubmit() {
    const patch = this.collectValues();
    this.updatePageContent(patch);
  }

  updatePageContent(patch) {
    this.props.organizationPage.update(patch).save()
    .catch((error) => { console.error(error); })
    .then((updatedPage) => {
      this.props.dispatch(setOrganizationPage(updatedPage));
    });
  }

  resetOrganizationPage() {
    this.props.dispatch(setOrganizationPage(this.props.organizationPage));
  }

  render() {
    if (!this.props.organizationPage) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    }

    const organizationPage = this.props.organizationPage;
    const PageContentInput = bindInput(organizationPage.content, <textarea rows="5" type="text" />);

    return (
      <div>
        <p>
          In this section:<br />
          Header 1 will appear <strong>orange</strong>.<br />
          Headers 2 - 6 and hyperlinks will appear <strong>dark-blue</strong>.
        </p>
        <FormContainer onSubmit={this.handleSubmit} onReset={this.resetOrganizationPage}>
          <fieldset className="form_fieldset">
            <label className="form_label" htmlFor="content">
              About Page Content:
              <br />
              <PageContentInput
                className="form_input form__input--full-width"
                id="content"
                ref={(node) => { this.fields = { content: node }; }}
              />
            </label>
            <small className="form_help">
              This is help text. {' '}
              <CharLimit limit={1000} string={this.props.organizationPage.content || ''} />
            </small>
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

// TODO
// on cancel changes don't dissappear
// if make change, then save, then make more changes, can't save more changes
