import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';

import { organization } from './test-data';

import OrganizationsLayout from '../../../src/modules/organizations/components/organizations-layout';

describe('OrganizationsLayout', () => {
  const noOrg = mount(
    <OrganizationsLayout organization={null} />,
  );

  const withOrg = mount(
    <OrganizationsLayout organization={organization} />,
  );

  it('should render', () => {
    expect(noOrg.find('aside')).to.have.length(1);
    expect(withOrg.find('aside')).to.have.length(1);
    expect(noOrg.find('section')).to.have.length(1);
    expect(withOrg.find('section')).to.have.length(1);
  });

  it('should disable and enable links correctly', () => {
    expect(noOrg.find('.organizationsLinks a')).to.have.length(1);
    expect(withOrg.find('.organizationsLinks a')).to.have.length(5);
  });
});
