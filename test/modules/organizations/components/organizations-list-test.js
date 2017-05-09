import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import { organizations, avatars } from '../test-data';

import OrganizationsList from '../../../../src/modules/organizations/components/organizations-list';

describe('OrganizationsList', () => {
  const wrapper = shallow(
    <OrganizationsList
      collaboratedOrganizations={organizations}
      organizationsAvatars={avatars}
      ownedOrganizations={organizations}
    />,
  );

  it('should render', () => {
    expect(wrapper.type()).to.equal('div');
  });

  it('should have a list of owned and collaborator organizations', () => {
    expect(wrapper.find('ListGroup')).to.have.length(2);
  });
});
