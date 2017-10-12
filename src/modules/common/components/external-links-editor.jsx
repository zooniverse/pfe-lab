import React from 'react';
import DragReorderable from 'drag-reorderable';

export default class ExternalLinksEditor extends React.Component {
  constructor(props) {
    super(props);

    this.handleAddLink = this.handleAddLink.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLinkReorder = this.handleLinkReorder.bind(this);
    this.handleRemoveLink = this.handleRemoveLink.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.renderTable = this.renderTable.bind(this);
  }

  handleAddLink() {
    const newUrl = {
      label: 'Example',
      url: 'https://example.com/'
    };
    const urls = this.props.urls;
    urls.push(newUrl);
    this.props.onChange(urls);
  }

  handleInputChange(idx, event) {
    const urls = this.props.urls;
    urls[idx][event.target.name] = event.target.value;
    this.props.onChange(urls);
  }

  handleLinkReorder(newLinkOrder) {
    const socialUrls = this.props.urls.filter(url => url.site);
    const urls = newLinkOrder.concat(socialUrls);
    this.props.onChange(urls);
  }

  handleRemoveLink(linkToRemove) {
    const urls = this.props.urls;
    const indexToRemove = urls.findIndex(i => (i.key === linkToRemove.key));
    if (indexToRemove > -1) {
      urls.splice(indexToRemove, 1);
      this.props.onChange(urls);
    }
  }

  renderRow(link) {
    const idx = this.props.urls.findIndex(i => (i.key === link.key));
    return (
      <tr key={link.key}>
        <td>
          <input
            type="text"
            name="label"
            value={link.label}
            onChange={this.handleInputChange.bind(this, idx)}
          />
        </td>
        <td>
          <input
            type="text"
            name="url"
            value={link.url}
            onChange={this.handleInputChange.bind(this, idx)}
          />
        </td>
        <td>
          <button onClick={this.handleRemoveLink.bind(this, link)} type="button">
            <i className="fa fa-remove" />
          </button>
        </td>
      </tr>
    );
  }

  renderTable(urls) {
    const tableUrls = urls
      .filter(url => !url.site)
      .map((url) => {
        if (!url.key) {
          const newUrl = url;
          newUrl.key = Math.random();
          return newUrl;
        }
        return url;
      });

    return (
      <table className="external-links-table">
        <thead>
          <tr>
            <th>Label</th>
            <th>URL</th>
          </tr>
        </thead>
        <DragReorderable
          tag="tbody"
          items={tableUrls}
          render={this.renderRow}
          onChange={this.handleLinkReorder}
        />
      </table>
    );
  }

  render() {
    return (
      <div>
        {(this.props.urls.length > 0)
          ? this.renderTable(this.props.urls)
          : null}

        <button type="button" onClick={this.handleAddLink}>Add external link</button>
      </div>
    );
  }
}

ExternalLinksEditor.defaultProps = {
  urls: []
};

ExternalLinksEditor.propTypes = {
  onChange: React.PropTypes.func,
  urls: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      url: React.PropTypes.string
    }))
};
