import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import { organization, organizationAvatar, organizationBackground } from './test-data';

import EditDetails from '../../../src/modules/organizations/components/edit-details';

describe('EditDetails', () => {
  const wrapper = shallow(
    <EditDetails organization={organization} organizationAvatar={organizationAvatar} organizationBackground={organizationBackground} />,
  );

  it('should render', () => {
    expect(wrapper.type()).to.equal('div');
  });
});
