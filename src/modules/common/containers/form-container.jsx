import React from 'react';

export default class FormContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = { show: false };
    this.handleChange = this.handleChange.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit();
    this.setState({ show: false });
  }

  render() {
    return (
      <form onChange={this.handleChange}>
        {this.props.children}
        {this.state.show &&
          <div>
            <button type="submit" onClick={this.handleSubmit}>{this.props.saveLabel}</button>
            <button type="reset" onClick={this.handleReset}>{this.props.cancelLabel}</button>
          </div>}
      </form>
    );
  }
}

FormContainer.defaultProps = {
  cancelLabel: 'Cancel',
  onReset: () => {},
  onSubmit: () => {},
  saveLabel: 'Save',
};

FormContainer.propTypes = {
  children: React.PropTypes.node,
  cancelLabel: React.PropTypes.string,
  onReset: React.PropTypes.func.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
  saveLabel: React.PropTypes.string,
};
