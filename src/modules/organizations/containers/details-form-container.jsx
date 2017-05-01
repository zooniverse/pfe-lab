import React from 'react';
import { connect } from 'react-redux';

import { organizationShape } from '../model';
import { setCurrentOrganization } from '../action-creators';
import bindInput from '../../common/containers/bind-input';
import FormContainer from '../../common/containers/form-container';
import CharLimit from '../../common/components/char-limit';

class DetailsFormContainer extends React.Component {
  constructor(props) {
    super(props);

    this.collectValues = this.collectValues.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetOrganization = this.resetOrganization.bind(this);
  }

  collectValues() {
    const result = {};
    Object.keys(this.fields).forEach((fieldName) => {
      result[fieldName] = this.fields[fieldName].value;
    });
    return result;
  }

  handleSubmit() {
    const patch = this.collectValues();
    this.props.updateOrganization(patch);
  }

  resetOrganization() {
    this.props.dispatch(setCurrentOrganization(this.props.organization));
  }

  render() {
    const organization = this.props.organization;
    const NameInput = bindInput(organization.display_name, <input type="text" />);
    const DescriptionInput = bindInput(organization.description, <input type="text" />);
    const IntroductionInput = bindInput(organization.introduction, <textarea />);

    return (
      <FormContainer onSubmit={this.handleSubmit} onReset={this.resetOrganization}>
        <label htmlFor="display-name">
          Name: <NameInput id="display-name" ref={(node) => { this.fields.display_name = node; }} />
        </label>
        <p><small>
          {this.props.organization.listed_at && "You cannot change listed organization's name" }
          The organization name is the first thing people will see about the organization and it will show up in the organization URL.
          Try to keep it short and sweet. Your organization’s URL is {`/projects/${this.props.organization.slug}`}
        </small></p>
        <br />
        <label htmlFor="description">
          Description: <DescriptionInput id="description" ref={(node) => { this.fields.description = node; }} />
        </label>
        <p><small>
          This should be a one-line call to action for your organization that displays on your landing page.
          <CharLimit limit={300} string={this.props.organization.description || ''} />
        </small></p>
        <br />
        <label htmlFor="introduction">
          Introduction: <IntroductionInput id="introduction" ref={(node) => { this.fields.introduction = node; }} />
        </label>
        <small className="form-help">
          Add a brief introduction to get people interested in your organization.
          This will display on your landing page.
          <CharLimit limit={1500} string={this.props.organization.introduction || ''} />
        </small>
      </FormContainer>
    );
  }
}

DetailsFormContainer.propTypes = {
  dispatch: React.PropTypes.func,
  organization: organizationShape,
  updateOrganization: React.PropTypes.func
};

function mapStateToProps(state) {
  return {
    organization: state.organization,
  };
}

export default connect(mapStateToProps)(DetailsFormContainer);
