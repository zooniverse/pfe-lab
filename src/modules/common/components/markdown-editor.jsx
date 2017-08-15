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
    const helpProps = { talk: this.props.helpTalk };
    if (this.props.helpTitle) {
      helpProps.title = this.props.helpTitle;
    }

    return (
      <Layer
        closer={true}
        flush={true}
        onClose={this.handleClickToggleHelp}
      >
        {<Markdownz.MarkdownHelp
          {...helpProps}
        />}
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
  helpTalk: false
};

MarkdownEditor.propTypes = {
  className: PropTypes.string,
  helpTalk: PropTypes.bool,
  helpTitle: PropTypes.node
};

export default MarkdownEditor;
