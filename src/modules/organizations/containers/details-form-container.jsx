import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DisplayNameSlugEditor } from 'zooniverse-react-components';

import { config } from '../../../constants/config';
import { setCurrentOrganization } from '../action-creators';
import { organizationShape } from '../model';
import MarkdownEditor from '../../common/components/markdown-editor';
import FormContainer from '../../common/containers/form-container';
import CharLimit from '../../common/components/char-limit';

class DetailsFormContainer extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.collectValues = this.collectValues.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetOrganization = this.resetOrganization.bind(this);

    this.state = {
      fields: {
        description: '',
        introduction: '',
        announcement: ''
      }
    };
  }

  componentDidMount() {
    this.setFields();
  }

  setFields() {
    const fields = {
      description: this.props.organization.description.slice(),
      introduction: this.props.organization.introduction.slice(),
      announcement: this.props.organization.announcement.slice()
    };
    this.setState({ fields });
  }

  handleChange(event) {
    const { value, name } = event.target;

    const fields = this.state.fields;
    fields[name] = value;

    this.setState({ fields });
  }

  collectValues() {
    const fields = this.state.fields;
    fields.display_name = this.display_name.value();

    const result = Object.keys(fields).reduce((values, key) => {
      const newValues = Object.assign({}, values);
      if (fields[key] !== this.props.organization[key]) {
        newValues[key] = fields[key];
      }
      return newValues;
    }, {});
    return result;
  }

  handleSubmit() {
    const patch = this.collectValues();
    this.props.updateOrganization(patch);
  }

  resetOrganization() {
    this.display_name.undoNameChange();
    this.setFields();
    this.props.dispatch(setCurrentOrganization(this.props.organization));
  }

  render() {
    const organization = this.props.organization;
    this.display_name = {};

    return (
      <div>
        <h5>Details</h5>
        <FormContainer onSubmit={this.handleSubmit} onReset={this.resetOrganization}>
          <fieldset className="form__fieldset">
            <label htmlFor="displayName">
              <DisplayNameSlugEditor
                id="displayName"
                origin={config.zooniverseURL}
                resource={organization}
                resourceType="organization"
                ref={(node) => { this.display_name = node; }}
              />
            </label>
          </fieldset>
          <fieldset className="form__fieldset">
            <label htmlFor="description">
              Description
              <input
                className="form__input form__input--full-width"
                id="description"
                name="description"
                onChange={this.handleChange}
                type="text"
                value={this.state.fields.description}
              />
            </label>
            <small className="form__help">
              This should be a one-line call to action for your organization that displays on your landing page.
              It will be displayed below the organization&apos;s name.{' '}
              <CharLimit limit={300} string={this.state.fields.description || ''} />
            </small>
          </fieldset>
          <fieldset className="form__fieldset">
            <label htmlFor="introduction">
              Introduction
              <MarkdownEditor
                id="introduction"
                name="introduction"
                onChange={this.handleChange}
                project={this.props.organization}
                rows="10"
                value={this.state.fields.introduction}
              />
            </label>
            <small className="form__help">
              Add a brief introduction to get people interested in your organization.
              This will display on your landing page.{' '}
              <CharLimit limit={1500} string={this.state.fields.introduction || ''} />
            </small>
          </fieldset>
          <fieldset className="form__fieldset">
            <label htmlFor="announcement">
              Announcement Banner
              <MarkdownEditor
                id="announcement"
                name="announcement"
                onChange={this.handleChange}
                project={this.props.organization}
                rows="2"
                value={this.state.fields.announcement}
              />
            </label>
            <small className="form__help">
              This text will appear as a banner at the top of all your organization&apos;s pages.
              Only use this when you&apos;ve got a big important announcement to make!{' '}
              <CharLimit limit={500} string={this.state.fields.announcement || ''} />
            </small>
          </fieldset>
        </FormContainer>
      </div>
    );
  }
}

DetailsFormContainer.defaultProps = {
  organization: {},
};

DetailsFormContainer.propTypes = {
  dispatch: PropTypes.func,
  organization: organizationShape,
  updateOrganization: React.PropTypes.func
};

function mapStateToProps(state) {
  return {
    organization: state.organization,
  };
}

export default connect(mapStateToProps)(DetailsFormContainer);
