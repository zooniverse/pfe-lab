/* eslint-disable react/jsx-filename-extension, no-unused-expressions */

import React from 'react';
import { Link } from 'react-router';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import OrganizationActionLink from '../../src/modules/organizations/components/organization-action-link';

describe('OrganizationActionLink', () => {
  it('should render a list item', () => {
    const noId = shallow(<OrganizationActionLink to="bar" text="foo" />);
    const withId = shallow(<OrganizationActionLink to="bar" text="foo" id="3" />);

    expect(noId.find('li')).to.have.length(1);
    expect(withId.find('li')).to.have.length(1);
  });

  it('shouldn\'t render a Link if an ID isn\'t present', () => {
    const wrapper = shallow(
      <OrganizationActionLink to="bar" text="foo" />,
    );

    expect(wrapper.find(Link)).to.have.length(0);
  });

  it('should render a Link if an ID is present', () => {
    const wrapper = shallow(
      <OrganizationActionLink to="bar" text="foo" id="3" />,
    );

    expect(wrapper.find(Link)).to.have.length(1);
  });

  it('should render the Link properly', () => {
    const wrapper = shallow(
      <OrganizationActionLink to="bar" text="foo" id="3" />,
    );

    const link = wrapper.find(Link);
    const linkProps = link.node.props;

    expect(linkProps.to).to.equal('/organizations/3/bar');
    expect(link.html()).to.equal('<a>foo</a>');
  });
});
