import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import { organization, organizationAvatar, organizationBackground } from '../test-data';

import EditDetails from '../../../../src/modules/organizations/components/edit-details';
import DetailsFormContainer from '../../../../src/modules/organizations/containers/details-form-container';
import ImageSelector from '../../../../src/modules/common/containers/image-selector';

describe('<EditDetails />', function() {
  let wrapper;
  const deleteOrganizationSpy = sinon.spy();

  before(function() {
    wrapper = shallow(
      <EditDetails
        deleteOrganization={deleteOrganizationSpy}
        organization={organization}
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
});
