import React from 'react';

export default class FormContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = { show: false, submitting: false };
    this.handleChange = this.handleChange.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.hideButtons = this.hideButtons.bind(this);
  }

  handleChange() {
    this.props.onChange();
    if (this.state.show === false) {
      this.setState({ show: true });
    }
  }

  handleReset(e) {
    e.preventDefault();
    this.props.onReset();
    this.hideButtons();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitting: true });
    this.props.onSubmit();
    this.hideButtons();
  }

  hideButtons() {
    if (this.state.submitting) {
      return this.setState({ show: false, submitting: false });
    }

    return this.setState({ show: false });
  }

  render() {
    return (
      <form onChange={this.handleChange}>
        {this.props.children}
        {this.state.show &&
          <div>
            <button
              type="submit"
              disabled={this.props.disabledSubmit || this.state.submitting}
              onClick={this.handleSubmit}
            >
              {this.props.submitLabel}
            </button>
            <button type="reset" disabled={this.state.submitting} onClick={this.handleReset}>{this.props.resetLabel}</button>
          </div>}
      </form>
    );
  }
}

FormContainer.defaultProps = {
  disabledSubmit: false,
  onChange: () => {},
  onReset: () => {},
  onSubmit: () => {},
  resetLabel: 'Cancel',
  submitLabel: 'Save',
};

FormContainer.propTypes = {
  children: React.PropTypes.node,
  disabledSubmit: React.PropTypes.bool,
  onChange: React.PropTypes.func,
  onReset: React.PropTypes.func.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
  resetLabel: React.PropTypes.string,
  submitLabel: React.PropTypes.string,
};
