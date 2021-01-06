import React from 'react';
import PropTypes from 'prop-types';
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

  handleInputChange(index, event) {
    const urls = this.props.urls;
    const { name, type, value } = event.target;

    let sanitisedValue = value;
    if (type === 'url' && value.length > 4) {
      const isURL = value.substring(0, 4) === 'http';
      sanitisedValue = isURL ? value : '';
    }

    urls[index][name] = sanitisedValue;
    this.props.onChange(urls);
  }

  handleLinkReorder(newLinkOrder) {
    const socialUrls = this.props.urls.filter(url => url.site);
    const urls = newLinkOrder.concat(socialUrls);
    this.props.onChange(urls);
  }

  handleRemoveLink(linkToRemove) {
    const urls = this.props.urls;
    const indexToRemove = urls.findIndex(item => (item._key === linkToRemove._key));
    if (indexToRemove > -1) {
      urls.splice(indexToRemove, 1);
      this.props.onChange(urls);
    }
  }

  renderRow(link) {
    const index = this.props.urls.findIndex(item => (item._key === link._key));
    return (
      <tr key={link._key}>
        <td>
          <input
            name="label"
            onChange={this.handleInputChange.bind(this, index)}
            required
            type="text"
            value={link.label}
          />
        </td>
        <td>
          <input
            name="url"
            onChange={this.handleInputChange.bind(this, index)}
            pattern="https?://.+"
            required
            type="url"
            value={link.url}
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
        if (!url._key) {
          const newUrl = url;
          newUrl._key = Math.random();
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
  onChange: PropTypes.func,
  urls: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string
    }))
};
