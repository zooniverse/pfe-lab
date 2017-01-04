import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import ListOrganizations from '../../../src/modules/organizations/components/list-organizations';

const mockOrganizations = [
  {
    id: '7',
    display_name: 'Testing organization',
    description: 'Fake provided by test framework',
  },
  {
    id: '42',
    display_name: 'Deep Thought',
    description: 'Probably wrong about everything',
  },
];

describe('ListOrganizations', () => {
  const wrapper = shallow(
    <ListOrganizations organizations={mockOrganizations} />,
  );

  it('should render', () => {
    expect(wrapper.type()).to.equal('div');
  });

  it('should have a list of organizations', () => {
    expect(wrapper.find('dl')).to.have.length(1);
  });

  it('should list all the organizations', () => {
    expect(wrapper.find('dd')).to.have.length(mockOrganizations.length);
    expect(wrapper.find('dt')).to.have.length(mockOrganizations.length);
  });

  it('should have a link to each organization', () => {
    expect(wrapper.find('Link')).to.have.length(mockOrganizations.length);
  });

  it('should have properly formatted links', () => {
    expect(wrapper.find('Link').first().props().to).to.equal(`/organizations/${mockOrganizations[0].id}`);
  });
});
