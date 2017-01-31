import React from 'react';

const bindInput = value =>
  ComposedComponent =>
    class BoundInput extends React.Component {
      constructor(props) {
        super(props);
        this.state = { value };
        this.updateValue = this.updateValue.bind(this);
      }

      updateValue(event) {
        this.setState({ value: event.target.value });
      }

      render() {
        const props = Object.assign(
          {},
          this.props,
          { value: this.state.value, onChange: this.updateValue },
        );

        if (Object.prototype.hasOwnProperty.call(props, 'withRef')) {
          props.ref = props.withRef;
          delete props.withRef;
        }

        return React.cloneElement(ComposedComponent, props);
      }
    };

export default bindInput;
