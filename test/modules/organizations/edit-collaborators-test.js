import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import EditCollaborators from '../../../src/modules/organizations/components/edit-collaborators';

const mockOrganization = {
  id: '7',
  display_name: 'Testing organization',
  description: 'Fake provided by test framework',
};

describe('EditCollaborators', () => {
  const wrapper = shallow(
    <EditCollaborators organization={mockOrganization} />,
  );

  it('should render', () => {
    expect(wrapper.type()).to.equal('div');
  });

  it('should know what the organization display name is', () => {
    expect(wrapper.find('h2').first().props().children).to.equal(mockOrganization.display_name);
  });
});
