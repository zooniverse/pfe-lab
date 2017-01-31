import React from 'react';

export default class BoundInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: this.props.value || '' };
    this.updateValue = this.updateValue.bind(this);
  }

  updateValue(event) {
    this.setState({ data: event.target.value });
  }

  render() {
    const wrappedChildren = React.Children.map(this.props.children, child =>
      React.cloneElement(child, { value: this.state.data, onChange: this.updateValue }),
    );

    return <span>{wrappedChildren}</span>;
  }
}

BoundInput.propTypes = {
  children: React.PropTypes.node.isRequired,
  value: React.PropTypes.string,
};
