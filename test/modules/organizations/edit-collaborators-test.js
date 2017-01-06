import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import { organization } from './test-data';

import EditCollaborators from '../../../src/modules/organizations/components/edit-collaborators';

describe('EditCollaborators', () => {
  const wrapper = shallow(
    <EditCollaborators organization={organization} />,
  );

  it('should render', () => {
    expect(wrapper.type()).to.equal('div');
  });

  it('should know what the organization display name is', () => {
    expect(wrapper.find('h2').first().props().children).to.equal(organization.display_name);
  });
});
