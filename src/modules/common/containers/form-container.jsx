import React from 'react';

export default class FormContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = { show: false };
    this.handleChange = this.handleChange.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.hideButtons = this.hideButtons.bind(this);
  }

  handleChange() {
    if (this.state.show === false) {
      this.setState({ show: true });
    }
  }

  handleReset(e) {
    e.preventDefault();
    this.props.onReset();
    this.setState({ show: false });
    this.hideButtons();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit();
    this.hideButtons();
  }

  hideButtons() {
    this.setState({ show: false });
  }

  render() {
    return (
      <form onChange={this.handleChange}>
        {this.props.children}
        {this.state.show &&
          <div>
            <button type="submit" onClick={this.handleSubmit}>{this.props.submitLabel}</button>
            <button type="reset" onClick={this.handleReset}>{this.props.resetLabel}</button>
          </div>}
      </form>
    );
  }
}

FormContainer.defaultProps = {
  resetLabel: 'Cancel',
  onReset: () => {},
  onSubmit: () => {},
  submitLabel: 'Save',
};

FormContainer.propTypes = {
  children: React.PropTypes.node,
  resetLabel: React.PropTypes.string,
  onReset: React.PropTypes.func.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
  submitLabel: React.PropTypes.string,
};
