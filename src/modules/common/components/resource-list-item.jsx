import React from 'react';
import { Link } from 'react-router';
import { config } from '../../../constants/config';

// TODO dynamic Edit link, change from Link to a with href determined progrmatically based on resourceType

const ResourceListItem = ({ avatar, resource, resourceType, showAvatar, showOwnerName, showRemove, onRemove }) => {
  return (
    <li key={resource.id} className="resources-list__item">
      <div className="resources-list__row">
        <Link
          to={`/${resourceType}/${resource.id}`}
          className="resources-list__edit resources-list--action"
        >
          {showAvatar && avatar &&
            <img src={avatar.src} alt="avatar" className="resources-list__avatar" />}
          <div className="resources-list__description">
            <strong>{resource.display_name}</strong>{' '}
            {showOwnerName &&
              <small>{`by ${resource.links.owner.display_name}`}</small>}
          </div>
          <span className="resources-list__icon">
            <i className="fa fa-pencil fa-fw" />
            <small>Edit</small>
          </span>
        </Link>
        <a
          className="resources-list__icon resources-list--action"
          href={`${config.zooniverseURL}${resourceType}/${resource.slug}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          <i className="fa fa-hand-o-right fa-fw" />
          <small>View</small>
        </a>
        {showRemove && onRemove &&
          <button
            className="button resources-list__icon resources-list--action"
            onClick={onRemove.bind(null, resource.id)}
            type="button"
          >
            <i className="fa fa-trash-o fa-fw" />
            <small>Remove</small>
          </button>}
      </div>
    </li>
  );
};

ResourceListItem.defaultProps = {
  avatar: {
    src: ''
  },
  showAvatar: false,
  showOwnerName: false,
  showRemove: false,
};

ResourceListItem.propTypes = {
  avatar: React.PropTypes.shape({
    src: React.PropTypes.string
  }),
  resource: React.PropTypes.shape({
    id: React.PropTypes.string,
    display_name: React.PropTypes.string,
    description: React.PropTypes.string,
    introduction: React.PropTypes.string
  }),
  resourceType: React.PropTypes.string,
  showAvatar: React.PropTypes.bool,
  showOwnerName: React.PropTypes.bool,
  showRemove: React.PropTypes.bool,
  onRemove: React.PropTypes.func,
};

export default ResourceListItem;
