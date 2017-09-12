import React from 'react';
import { Link } from 'react-router';
import { config } from '../../../constants/config';

const ResourcesList = ({
  resources,
  resourcesAvatars,
  resourceType,
  showAvatar,
  showOwnerName,
  showRemove,
  onRemove,
  showStatus,
  title
}) => {
  const findAvatar = resource =>
    // TODO why is the links property for organization 'linked'?
    resourcesAvatars.filter(avatar => avatar.links.linked.id === resource.id);

  return (
    <div>
      {title &&
        <h2 className="resources-list__title">{title}</h2>}
      <ul className="resources-list__list">
        {resources.map((resource) => {
          let avatar = {};
          if (showAvatar && resourcesAvatars && findAvatar(resource).length) {
            avatar = findAvatar(resource)[0];
          }

          let colorLabel;
          let statusMessage;
          if (showStatus) {
            if (resource.launch_approved === true) {
              colorLabel = 'green';
              statusMessage = 'launch approved';
            } else if (resource.launch_approved === false) {
              colorLabel = 'orange';
              statusMessage = 'not launch approved';
            } else {
              colorLabel = 'red';
              statusMessage = 'unknown';
            }
          }
          const editContent = (
            <div className="resources-list__editContent resources-list--action">
              {showAvatar && avatar &&
                <img src={avatar.src} alt="" className="resources-list__avatar" />}
              <div className="resources-list__description">
                <strong>{resource.display_name}</strong>{' '}
                {showOwnerName &&
                  <small>{`by ${resource.links.owner.display_name}`}</small>}
                {showStatus &&
                  <span
                    className={`resources-list__status color-label ${colorLabel}`}
                  >
                    {statusMessage}
                  </span>}
              </div>
              <span className="resources-list__icon">
                <i className="fa fa-pencil fa-fw" />
                <small>Edit</small>
              </span>
            </div>);

          let EditLink;
          if (resourceType === 'organizations') {
            EditLink = () => (
              <Link className="resources-list__editLink" to={`/${resourceType}/${resource.id}`}>
                {editContent}
              </Link>);
          }
          if (resourceType === 'projects') {
            EditLink = () => (
              <a className="resources-list__editLink" href={`${config.zooniverseURL}lab/${resource.id}`}>
                {editContent}
              </a>);
          }

          return (
            <li key={resource.id} className="resources-list__item">
              <div className="resources-list__row">
                <EditLink />
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
        })}
      </ul>
    </div>
  );
};

ResourcesList.defaultProps = {
  resourcesAvatars: [],
  showAvatar: false,
  showOwnerName: false,
  showRemove: false,
  onRemove: () => {},
  showStatus: false,
  title: null
};

ResourcesList.propTypes = {
  resources: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      id: React.PropTypes.string,
      display_name: React.PropTypes.string
    })
  ).isRequired,
  resourcesAvatars: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      src: React.PropTypes.string
    })
  ),
  resourceType: React.PropTypes.string.isRequired,
  showAvatar: React.PropTypes.bool,
  showOwnerName: React.PropTypes.bool,
  showRemove: React.PropTypes.bool,
  onRemove: React.PropTypes.func,
  showStatus: React.PropTypes.bool,
  title: React.PropTypes.string
};

export default ResourcesList;
