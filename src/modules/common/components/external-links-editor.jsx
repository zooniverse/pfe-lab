import React from 'react';
import DragReorderable from 'drag-reorderable';

// TODO refactor as stateless component

export default class ExternalLinksEditor extends React.Component {
  constructor(props) {
    super(props);

    this.handleAddLink = this.handleAddLink.bind(this);
    this.handleLinkReorder = this.handleLinkReorder.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
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

  handleLinkReorder(newLinkOrder) {
    const socialUrls = this.props.urls.filter(url => url.path);
    const urls = newLinkOrder.concat(socialUrls);
    this.props.onChange(urls);
  }

  handleInputChange(idx, event) {
    const urls = this.props.urls;
    urls[idx][event.target.name] = event.target.value;
    this.props.onChange(urls);
  }

  handleRemoveLink(linkToRemove) {
    const urlList = this.props.urls.slice();
    const indexToRemove = urlList.findIndex(i => (i._key === linkToRemove._key));
    if (indexToRemove > -1) {
      urlList.splice(indexToRemove, 1);
      const changes = {
        urls: urlList
      };
    }
    this.props.onChange(urlList);
  }

  renderRow(link) {
    // Find the link's current position in the list
    const idx = this.props.urls.findIndex(i => (i._key === link._key));
    return (
      <tr key={link._key}>
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
          <button type="button">
            <i className="fa fa-remove" onClick={this.handleRemoveLink.bind(this, link)} />
          </button>
        </td>
      </tr>
    );
  }

  renderTable(urls) {
    const tableUrls = urls.filter(url => !url.path);
    for (const link of tableUrls) {
      if (!link._key) {
        link._key = Math.random();
      }
    }

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

        <button type="button" onClick={this.handleAddLink}>Add a link</button>
      </div>
    );
  }
}

ExternalLinksEditor.defaultProps = {
  urls: []
};

ExternalLinksEditor.propTypes = {
  onChange: React.PropTypes.func,
  urls: React.PropTypes.array
};
