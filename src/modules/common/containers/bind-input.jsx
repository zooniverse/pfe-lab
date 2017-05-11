import React from 'react';

function bindInput(changeableValue, ComposedComponent) {
  class BoundInput extends React.Component {
    constructor(props) {
      super(props);
      const checked = props.type === 'checkbox' ? changeableValue : false;
      const value = props.type !== 'checkbox' ? changeableValue : null;
      this.state = { value, checked };
      this.updateValue = this.updateValue.bind(this);
    }

    updateValue(event) {
      const target = event.target;
      if (this.props.type !== 'checkbox') {
        this.setState({ value: target.value });
      } else {
        this.setState({ checked: target.checked });
      }
    }

    value() {
      return this.state.value;
    }

    render() {
      let props;

      if (this.props.type === 'checkbox') {
        props = Object.assign(
          {},
          this.props,
          { checked: this.state.checked, onChange: this.updateValue },
        );
      } else {
        props = Object.assign(
          {},
          this.props,
          { onChange: this.updateValue, value: this.state.value },
        );
      }


      if (Object.prototype.hasOwnProperty.call(props, 'withRef')) {
        props.ref = props.withRef;
        delete props.withRef;
      }

      return React.cloneElement(ComposedComponent, props);
    }
  }

  BoundInput.propTypes = {
    type: React.PropTypes.string.isRequired,
  };

  BoundInput.defaultProps = {
    type: 'text',
  };

  return BoundInput;
}

export default bindInput;
