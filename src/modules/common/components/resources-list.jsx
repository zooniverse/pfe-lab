import React from 'react';
import ResourceListItem from './resource-list-item';

const ResourcesList = ({ resources, resourcesAvatars, resourceType, showAvatar, showOwnerName, showRemove, onRemove, title }) => {
  const findAvatar = (resource) => {
    // TODO why is the links property for organization 'linked'?
    return resourcesAvatars.filter(avatar => avatar.links.linked.id === resource.id);
  };

  return (
    <div>
      <h2 className="resources-list__title">{title}</h2>
      <ul className="resources-list__list">
        {resources.map((resource) => {
          let avatar;
          if (showAvatar && resourcesAvatars && findAvatar(resource).length) {
            avatar = findAvatar(resource)[0];
          }
          return (
            <ResourceListItem
              key={resource.id}
              avatar={avatar}
              resource={resource}
              resourceType={resourceType}
              showAvatar={showAvatar}
              showOwnerName={showOwnerName}
              showRemove={showRemove}
              onRemove={onRemove}
            />
          );
        })}
      </ul>
    </div>
  );
};

ResourcesList.defaultProps = {
  showAvatar: false,
  showOwnerName: false,
  showRemove: false,
};

ResourcesList.propTypes = {
  resources: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      id: React.PropTypes.string,
      display_name: React.PropTypes.string,
      description: React.PropTypes.string,
      introduction: React.PropTypes.string
    })
  ),
  resourcesAvatars: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      src: React.PropTypes.string
    })
  ),
  resourceType: React.PropTypes.string,
  showAvatar: React.PropTypes.bool,
  showOwnerName: React.PropTypes.bool,
  showRemove: React.PropTypes.bool,
  onRemove: React.PropTypes.func,
  title: React.PropTypes.string,
};

export default ResourcesList;
