import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import { organization, organizationPage } from '../test-data';
import AboutPage from '../../../../src/modules/organizations/components/about-page';

describe('<AboutPage />', function() {
  it('should render', function() {
    const wrapper = shallow(<AboutPage />);
    expect(wrapper.type()).to.equal('div');
  });

  describe('without an organizationPage prop', function() {
    it('should show loading', function() {
      const wrapper = shallow(<AboutPage />);
      const loading = wrapper.find('p');
      expect(loading.text()).to.equal('Loading...');
    });
  });

  describe('wihtout any linked pages', function() {
    const createSpy = sinon.spy();
    let wrapper;
    let createButton;

    before(function() {
      wrapper = shallow(
        <AboutPage organization={organization} organizationPage={{}} onCreatePage={createSpy} />
      );
      createButton = wrapper.find('button');
    });

    it('should display a create page button', function() {
      expect(createButton.text()).to.equal('Create a new about page');
    });

    it('should call onCreatePage when clicking the create button', function() {
      createButton.simulate('click');
      expect(createSpy.calledOnce).to.be.true;
    });
  });

  describe('with a linked page', function() {
    it('should render a <FormContainer />', function() {
      const wrapper = shallow(
        <AboutPage organization={organization} organizationPage={organizationPage} />
      );
      expect(wrapper.find('FormContainer')).to.have.lengthOf(1);
    });
  });
});
