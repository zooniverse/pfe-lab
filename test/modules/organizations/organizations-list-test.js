import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import { organizations } from './test-data';

import OrganizationsList, { ListGroup } from '../../../src/modules/organizations/components/organizations-list';

describe('OrganizationsList', () => {
  const wrapper = shallow(
    <OrganizationsList
      collaboratedOrganizations={organizations}
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

describe('ListGroup', () => {
  const wrapper = shallow(
    <ListGroup
      organizations={organizations}
    />,
  );

  it('should have a list of organizations', () => {
    expect(wrapper.find('ul')).to.have.length(1);
  });

  it('should list all the organizations', () => {
    expect(wrapper.find('li')).to.have.length(organizations.length);
  });

  it('should have a link to edit and view each organization', () => {
    expect(wrapper.find('Link')).to.have.length(4);
  });

  it('should have properly formatted link to edit organization', () => {
    expect(wrapper.find('Link').first().props().to).to.equal(`/organizations/${organizations[0].id}`);
  });
});
