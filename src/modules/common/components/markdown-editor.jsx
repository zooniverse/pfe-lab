import React, { PropTypes } from 'react';
import * as Markdownz from 'markdownz';
import Layer from 'grommet/components/Layer';

class MarkdownEditor extends React.Component {
  constructor(props) {
    super(props);

    this.handleClickToggleHelp = this.handleClickToggleHelp.bind(this);

    this.state = {
      isHelpVisible: false
    };
  }

  handleClickToggleHelp() {
    this.setState({ isHelpVisible: !this.state.isHelpVisible });
  }

  renderMarkdownHelp() {
    return (
      <Layer
        closer={true}
        flush={true}
        onClose={this.handleClickToggleHelp}
      >
        {<Markdownz.MarkdownHelp talk={this.props.talk} />}
      </Layer>
    );
  }

  render() {
    return (
      <div>
        {this.state.isHelpVisible && this.renderMarkdownHelp()}
        <Markdownz.MarkdownEditor
          {...this.props}
          className={this.props.className}
          onHelp={() => this.handleClickToggleHelp()}
        />
      </div>
    );
  }
}

MarkdownEditor.defaultProps = {
  className: 'form__markdown-editor--full',
  talk: false
};

MarkdownEditor.propTypes = {
  className: PropTypes.string,
  talk: PropTypes.bool
};

export default MarkdownEditor;
