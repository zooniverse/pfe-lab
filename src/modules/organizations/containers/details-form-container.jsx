import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { MarkdownEditor, MarkdownHelp } from 'markdownz';
import { DisplayNameSlugEditor } from 'zooniverse-react-components';
import Layer from 'grommet/components/Layer';
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
    this.onTextAreaChange = this.onTextAreaChange.bind(this);
    this.resetOrganization = this.resetOrganization.bind(this);

    this.state = {
      textarea: ''
    };
  }

  componentDidMount() {
    this.setState({ textarea: this.props.organization.introduction });
  }

  onTextAreaChange(event) {
    const textarea = event.target.value;

    this.setState({ textarea });
  }

  collectValues() {
    // TODO rework this to better work with the MarkdownEditor
    // TODO only submit changed fields!
    const result = {};
    Object.keys(this.fields).forEach((fieldName) => {
      result[fieldName] = this.fields[fieldName].value();
    });
    result.introduction = this.state.textarea;
    return result;
  }

  handleSubmit() {
    const patch = this.collectValues();
    this.props.updateOrganization(patch);
  }

  resetOrganization() {
    this.props.dispatch(setCurrentOrganization(this.props.organization));
  }

  alert(message) {
    const defer = {
      resolve: null,
      reject: null
    };

    const promise = new Promise((resolve, reject) => {
      defer.resolve = resolve;
      defer.reject = reject;
    });

    if (typeof message === 'function') {
      var message = message(defer.resolve, defer.reject);
    }

    const container = document.createElement('div');
    document.body.appendChild(container);

    ReactDOM.render(
      <Layer
        closer={true}
        flush={true}
        onClose={defer.resolve}
      >
        {message}
      </Layer>, container
    );

    promise.then(() => {
      ReactDOM.unmountComponentAtNode(container);
      return container.parentNode.removeChild(container);
    });

    return promise;
  }

  render() {
    // TODO rename prop in markdownz to be resource not project.
    // TODO extract <MarkdownHelp /> into shared components repo.
    // TODO extract MarkdownEditor into its own component put into common folder
    // TODO split into functional component
    const organization = this.props.organization;
    const DescriptionInput = bindInput(organization.description, <input type="text" />);
    this.fields = {};

    return (
      <FormContainer onSubmit={this.handleSubmit} onReset={this.resetOrganization}>
        <fieldset className="form__fieldset">
          <DisplayNameSlugEditor
            resource={organization}
            resourceType="organization"
            ref={(node) => { this.fields.display_name = node; }}
          />
        </fieldset>
        <fieldset className="form__fieldset">
          <label className="form__label" htmlFor="description">
            Description
            <DescriptionInput
              className="form__input form__input--full-width"
              id="description"
              ref={(node) => { this.fields.description = node; }}
            />
          </label>
          <small className="form__help">
            This should be a one-line call to action for your organization that displays on your landing page.{' '}
            <CharLimit limit={300} string={this.props.organization.description || ''} />
          </small>
        </fieldset>
        <fieldset className="form__fieldset">
          <label className="form__label" htmlFor="introduction">
            Introduction
            <MarkdownEditor
              className="form__markdown-editor--full"
              id="introduction"
              name="introduction"
              onChange={this.onTextAreaChange}
              project={this.props.organization}
              rows="10"
              value={this.state.textarea}
              onHelp={() => this.alert(MarkdownHelp)}
            />
          </label>
          <small className="form__help">
            Add a brief introduction to get people interested in your organization.
            This will display on your landing page.{' '}
            <CharLimit limit={1500} string={this.state.textarea || ''} />
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
