import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import { organization } from './test-data';

import AboutPage from '../../../src/modules/organizations/components/about-page';

describe('AboutPage', () => {
  const wrapper = shallow(
    <AboutPage organization={organization} />,
  );

  it('should render', () => {
    expect(wrapper.type()).to.equal('div');
  });

  it('should show loading without about page prop', () => {
    const loading = wrapper.find('p');
    expect(loading.text()).to.equal('Loading...');
  });

  it('should display a create page button', () => {
    wrapper.setProps({ organizationPage: {} });
    const createButton = wrapper.find('button');
    expect(createButton.text()).to.equal('Create a new about page');
  });
});
