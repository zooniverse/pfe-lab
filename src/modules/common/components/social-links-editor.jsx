import React from 'react';
import DragReorderable from 'drag-reorderable';
import SOCIAL_ICONS from '../../../lib/social-icons';

export default class ExternalLinksEditor extends React.Component {

  constructor(props) {
    super(props);

    const socialOrder = Object.keys(SOCIAL_ICONS);
    this.state = {
      socialOrder
    };

    this.reorderDefault = this.reorderDefault.bind(this);
    this.handleNewLink = this.handleNewLink.bind(this);
    this.handleLinkReorder = this.handleLinkReorder.bind(this);
    this.handleRemoveLink = this.handleRemoveLink.bind(this);
    this.renderRow = this.renderRow.bind(this);
  }

  componentDidMount() {
    this.reorderDefault();
  }

  // not sure if we need this.
  componentWillReceiveProps(nextProps) {
    if (nextProps.urls !== this.props.urls) {
      this.reorderDefault();
    }
  }

  reorderDefault() {
    const socialUrls = this.props.urls.filter(url => url.path);
    const newOrder = [];
    socialUrls.map(link => newOrder.push(link.site));
    this.state.socialOrder.map((item) => {
      if (newOrder.indexOf(item) < 0) {
        newOrder.push(item);
      }
    });
    this.setState({ socialOrder: newOrder });
  }

  handleNewLink(site, e) {
    let index = this.indexFinder(this.props.urls, site);
    if (index < 0) { index = this.props.urls.length; }

    if (e.target.value) {
      const changes = {
        label: '',
        path: e.target.value,
        site,
        url: `https://${site}${e.target.value}`
      };
      const urls = this.props.urls;
      urls[index] = changes;
      this.props.onChange(urls);
    } else {
      this.handleRemoveLink(site);
    }

  }

  handleLinkReorder(newLinkOrder) {
    const externalUrls = this.props.urls.filter(url => !url.path);
    const socialUrls = this.props.urls.filter(url => url.path);
    const newSocialUrls = socialUrls.sort((a, b) => newLinkOrder.indexOf(a.site) - newLinkOrder.indexOf(b.site));
    const changes = externalUrls.concat(newSocialUrls);

    this.props.onChange(changes);
    this.setState({ socialOrder: newLinkOrder });
  }

  handleRemoveLink(linkToRemove) {
    const urls = this.props.urls.slice();
    const indexToRemove = this.indexFinder(urls, linkToRemove);
    if (indexToRemove > -1) {
      urls.splice(indexToRemove, 1);
      this.props.onChange(urls);
    }
  }

  handleDisableDrag(event) {
    event.target.parentElement.parentElement.parentElement.setAttribute('draggable', false);
  }

  handleEnableDrag(event) {
    event.target.parentElement.parentElement.parentElement.setAttribute('draggable', true);
  }

  indexFinder(toSearch, toFind) {
    return toSearch.findIndex(i => (i.site === toFind));
  }

  renderRow(site, i) {
    const index = this.indexFinder(this.props.urls, site);
    const value = index >= 0 ? this.props.urls[index].path : '';

    return (
      <tr key={i}>
        <td>{site}</td>
        <td>
          <input
            type="text"
            name={`urls.${site}.url`}
            value={value}
            onChange={this.handleNewLink.bind(this, site)}
            onMouseDown={this.handleDisableDrag}
            onMouseUp={this.handleEnableDrag}
          />
        </td>
        <td>
          <button type="button" onClick={this.handleRemoveLink.bind(this, site)}>
            <i className="fa fa-remove" />
          </button>
        </td>
      </tr>
    );
  }

  render() {
    return (
      <table className="edit-social-links">
        <DragReorderable
          tag="tbody"
          items={this.state.socialOrder}
          render={this.renderRow}
          onChange={this.handleLinkReorder}
        />
      </table>
    );
  }
}


