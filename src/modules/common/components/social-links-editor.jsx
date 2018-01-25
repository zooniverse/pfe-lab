import React from 'react';
import DragReorderable from 'drag-reorderable';
import SOCIAL_ICONS from '../../../lib/social-icons';

export default class SocialLinksEditor extends React.Component {

  constructor(props) {
    super(props);

    this.handleAddLink = this.handleAddLink.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLinkReorder = this.handleLinkReorder.bind(this);
    this.handleRemoveLink = this.handleRemoveLink.bind(this);
    this.renderRow = this.renderRow.bind(this);
  }

  handleAddLink(e) {
    const newUrl = {
      label: '',
      path: '',
      site: e.target.value,
      url: `https://${e.target.value}`
    };
    const urls = this.props.urls;
    urls.push(newUrl);
    this.props.onChange(urls);
  }

  handleInputChange(index, event) {
    const urls = this.props.urls;
    const site = urls[index].site;
    urls[index].path = event.target.value;
    urls[index].url = `https://${site}${event.target.value}`;
    this.props.onChange(urls);
  }

  handleLinkReorder(newLinkOrder) {
    const externalUrls = this.props.urls.filter(url => !url.site);
    const urls = externalUrls.concat(newLinkOrder);
    this.props.onChange(urls);
  }

  handleRemoveLink(linkToRemove) {
    const urls = this.props.urls;
    const indexToRemove = urls.indexOf(linkToRemove);
    if (indexToRemove > -1) {
      urls.splice(indexToRemove, 1);
      this.props.onChange(urls);
    }
  }

  renderRow(link) {
    const index = this.props.urls.findIndex(item => (item.site === link.site));
    return (
      <tr key={index}>
        <td>{link.site}</td>
        <td>
          <input
            type="text"
            value={link.path || ''}
            onChange={this.handleInputChange.bind(this, index)}
            onMouseDown={this.handleDisableDrag}
            onMouseUp={this.handleEnableDrag}
          />
        </td>
        <td>
          <button type="button" onClick={this.handleRemoveLink.bind(this, link)}>
            <i className="fa fa-remove" />
          </button>
        </td>
      </tr>
    );
  }

  render() {
    const socialUrls = this.props.urls.filter(url => url.site);
    const socialOptions = Object.keys(SOCIAL_ICONS)
      .filter(item => socialUrls.map(url => url.site).indexOf(item) < 0);
    return (
      <div>
        <table className="edit-social-links">
          <DragReorderable
            tag="tbody"
            items={socialUrls}
            render={this.renderRow}
            onChange={this.handleLinkReorder}
          />
        </table>
        <label htmlFor="social link">
          Add social link:{' '}
          <select id="social link" onChange={this.handleAddLink} value="stuck">
            <option value="stuck" disabled>Social links...</option>
            {socialOptions.map(item => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
      </div>);
  }
}

SocialLinksEditor.defaultProps = {
  urls: []
};

SocialLinksEditor.propTypes = {
  onChange: React.PropTypes.func,
  urls: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      url: React.PropTypes.string
    }))
};
