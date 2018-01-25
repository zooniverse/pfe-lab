import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import { organizations, organizationAvatar, organizationBackground } from '../test-data';

import EditDetails from '../../../../src/modules/organizations/components/edit-details';
import DetailsFormContainer from '../../../../src/modules/organizations/containers/details-form-container';
import ImageSelector from '../../../../src/modules/common/containers/image-selector';

const listedOrganization = organizations[0];
const unlistedOrganization = organizations[1];

describe('<EditDetails />', function() {
  let wrapper;
  const deleteOrganizationSpy = sinon.spy();

  before(function() {
    wrapper = shallow(
      <EditDetails
        deleteOrganization={deleteOrganizationSpy}
        organization={listedOrganization}
        organizationAvatar={organizationAvatar}
        organizationBackground={organizationBackground}
      />
    );
  });

  it('should render', function() {
    expect(wrapper.type()).to.equal('div');
    expect(wrapper.hasClass('organization-edit-details')).to.be.true;
  });

  it('should render <DetailsFormContainer />', function() {
    expect(wrapper.find(DetailsFormContainer)).to.have.lengthOf(1);
  });

  it('should render <ImageSelector />', function() {
    expect(wrapper.find(ImageSelector)).to.have.lengthOf(2);
  });

  it('should render a delete button ', function() {
    const deleteButton = wrapper.find('button.button--full-alert');
    deleteButton.simulate('click');
    expect(deleteOrganizationSpy.calledOnce).to.be.true;
  });

  it('should render a listed_at date when passed a listed organization', function() {
    const formattedDate = new Date(listedOrganization.listed_at).toDateString();
    expect(wrapper.find('span').last().text()).to.equal(`Listed At: ${formattedDate}`);
  });

  it('should render true when passed a listed organization', function() {
    const orgStatus = wrapper.find('span').at(1).children().text();
    expect(orgStatus).to.equal('true');
  });

  it('should render false when passed an unlisted organization', function() {
    wrapper.setProps({ organization: unlistedOrganization });
    const orgStatus = wrapper.find('span').at(1).children().text();
    expect(orgStatus).to.equal('false');
  });

  it('should not render a Listed At field for an unlisted organization', function() {
    const orgStatusWrapper = wrapper.find('div').at(5);
    expect(orgStatusWrapper.children()).to.have.lengthOf(2);
  });
});
