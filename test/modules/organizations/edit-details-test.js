import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import EditDetails from '../../../src/modules/organizations/components/edit-details';

const mockOrganization = {
  id: '7',
  display_name: 'Testing organization',
  description: 'Fake provided by test framework',
};

describe('EditDetails', () => {
  const wrapper = shallow(
    <EditDetails organization={mockOrganization} />,
  );

  it('should render', () => {
    expect(wrapper.type()).to.equal('div');
  });

  it('should know what the organization display name is', () => {
    expect(wrapper.find('h2').first().props().children).to.equal(mockOrganization.display_name);
  });
});
