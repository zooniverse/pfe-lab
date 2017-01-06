import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import { organizations } from './test-data';

import ListOrganizations from '../../../src/modules/organizations/components/list-organizations';

describe('ListOrganizations', () => {
  const wrapper = shallow(
    <ListOrganizations organizations={organizations} />,
  );

  it('should render', () => {
    expect(wrapper.type()).to.equal('div');
  });

  it('should have a list of organizations', () => {
    expect(wrapper.find('dl')).to.have.length(1);
  });

  it('should list all the organizations', () => {
    expect(wrapper.find('dd')).to.have.length(organizations.length);
    expect(wrapper.find('dt')).to.have.length(organizations.length);
  });

  it('should have a link to each organization', () => {
    expect(wrapper.find('Link')).to.have.length(organizations.length);
  });

  it('should have properly formatted links', () => {
    expect(wrapper.find('Link').first().props().to).to.equal(`/organizations/${organizations[0].id}`);
  });
});
