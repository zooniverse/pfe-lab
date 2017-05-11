import React from 'react';
import { connect } from 'react-redux';
import { MarkdownEditor } from 'markdownz';
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
      result[fieldName] = this.fields[fieldName].value();
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
    // TODO rename prop in markdownz to be resource not project.
    // TODO extract <MarkdownHelp /> into shared components repo.
    const organization = this.props.organization;
    const NameInput = bindInput(organization.display_name, <input type="text" />);
    const DescriptionInput = bindInput(organization.description, <input type="text" />);

    return (
      <FormContainer onSubmit={this.handleSubmit} onReset={this.resetOrganization}>
        <fieldset className="form__fieldset">
          <label className="form__label" htmlFor="display-name">
            Name <NameInput className="form__input form__input--full-width" id="display-name" ref={(node) => { this.fields = { display_name: node }; }} />
          </label>
          <small className="form__help">
            {this.props.organization.listed_at && "You cannot change listed organization's name" }
            The organization name is the first thing people will see about the organization.
            Try to keep it short and sweet.
          </small>
        </fieldset>
        <fieldset className="form__fieldset">
          <label className="form__label" htmlFor="description">
            Description <DescriptionInput className="form__input form__input--full-width" id="description" ref={(node) => { this.fields = { description: node }; }} />
          </label>
          <small className="form__help">
            This should be a one-line call to action for your organization that displays on your landing page.{' '}
            <CharLimit limit={300} string={this.props.organization.description || ''} />
          </small>
        </fieldset>
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
