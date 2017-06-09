import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import configureStore from 'redux-mock-store';

import ConnectedAboutContainer, { AboutContainer } from '../../../../src/modules/organizations/containers/about-container';
import { organization, organizationPage } from '../test-data';
import resolver from '../../../utils/resolver';

const initialState = {
  organization,
  organizationPage: null
};

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore(initialState);

describe('<AboutContainer />', function() {
  let wrapper;
  // let fetchPageSpy;

  // Should we build a mocked apiClient with rewire?
  // AboutContainer.__Rewire__('apiClient', {
  //   type: (type) => ({
  //     get: () => {
  //       if (type === 'pages') {
  //         return resolver(organizationPage);
  //       }
  //     },
  //     create: () => {
  //       if (type === 'pages') {
  //         return resolver(organizationPage);
  //       }
  //     }
  //   })
  // });

  before(function() {
    // fetchPageSpy = sinon.spy(AboutContainer.prototype, 'fetchPage');

    wrapper = shallow(<AboutContainer organization={organization} />);
  });

  it('renders', function() {
    expect(wrapper.find('AboutPage')).to.have.lengthOf(1);
  });

  it('has a defined organization prop', function() {
    expect(wrapper.props().organization).to.equal(organization);
  });

  // describe('componentDidMount', function() {
  //   it('calls fetchPage', function() {
  //     expect(fetchPageSpy.calledOnce).to.be.true;
  //   });
  // });
});
