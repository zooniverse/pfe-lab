import React from 'react';
import { Link } from 'react-router';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import { organization } from './test-data';

import OrganizationActionLink from '../../../src/modules/organizations/components/organization-action-link';

const sampleLinkItem = {
  to: 'foo',
  label: 'bar',
};

describe('OrganizationActionLink', () => {
  it('should render a list item', () => {
    const noId = shallow(<OrganizationActionLink to={sampleLinkItem.to} text={sampleLinkItem.label} />);
    const withId = shallow(<OrganizationActionLink to={sampleLinkItem.to} text={sampleLinkItem.label} id={organization.id} />);

    expect(noId.find('li')).to.have.length(1);
    expect(withId.find('li')).to.have.length(1);
  });

  it('shouldn\'t render a Link if an ID isn\'t present', () => {
    const wrapper = shallow(
      <OrganizationActionLink to={sampleLinkItem.to} text={sampleLinkItem.label} />,
    );

    expect(wrapper.find(Link)).to.have.length(0);
  });

  it('should render a Link if an ID is present', () => {
    const wrapper = shallow(
      <OrganizationActionLink to={sampleLinkItem.to} text={sampleLinkItem.label} id={organization.id} />,
    );

    expect(wrapper.find(Link)).to.have.length(1);
  });

  it('should render the Link properly', () => {
    const wrapper = shallow(
      <OrganizationActionLink to={sampleLinkItem.to} text={sampleLinkItem.label} id={organization.id} />,
    );

    const linkProps = wrapper.find(Link).first().props();

    expect(linkProps.to).to.equal(`/organizations/${organization.id}/${sampleLinkItem.to}`);
    expect(linkProps.children).to.equal(sampleLinkItem.label);
  });
});
