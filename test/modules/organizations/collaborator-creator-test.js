import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { UserSearch } from 'zooniverse-react-components';

import CollaboratorCreator from '../../../src/modules/organizations/containers/collaborator-creator-container';
import FormContainer from '../../../src/modules/common/containers/form-container';

describe('CollaboratorCreator', function() {
  let wrapper;
  let addCollaborators;

  const ROLES_INFO = {
    collaborator: {
      label: 'Collaborator',
      description: 'Collaborators have full access to edit organization content, including deleting the organization.',
    },
  };

  const POSSIBLE_ROLES = {
    collaborator: 'admin',
  };

  before(function() {
    addCollaborators = sinon.spy();
    wrapper = mount(<CollaboratorCreator
      addCollaborators={addCollaborators}
      possibleRoles={POSSIBLE_ROLES}
      rolesInfo={ROLES_INFO}
    />);
  });

  it('should render a <FormContainer /> component', function() {
    expect(wrapper.find(FormContainer)).to.have.length(1);
  });

  it('should render a <UserSearch /> component', function() {
    expect(wrapper.find(UserSearch)).to.have.length(1);
  });

  // describe('handleChange event', function() {
  //   let roleCheckbox;
  //   before(function() {
  //     roleCheckbox = wrapper.find('#LAB_COLLABORATORS_PAGE_collaborator');
  //   });

    // it('should not set disabledSubmit state to false if form is partially filled', function() {
    //   roleCheckbox.simulate('change', { target: { checked: true } });
    //   // wrapper.instance().handleChange();
    //   expect(wrapper.state('disabledSubmit')).to.be.true;
    // });

    // it('should set disabledSubmit state to false if form is fully filled', function() {
    //   roleCheckbox = wrapper.find('#LAB_COLLABORATORS_PAGE_collaborator').render();
    //   // roleCheckbox.simulate('change', { target: { checked: true } });
    //   roleCheckbox.prop('checked', true);
    //   wrapper.instance().userSearch.onChange(['srallen086']);
    //   console.log('wrapper', roleCheckbox.prop('checked'), wrapper.state())
    //   // wrapper.instance().handleChange();
    //   expect(wrapper.state('disabledSubmit')).to.be.false;
    // });

    // afterEach(function() {
    //   wrapper.instance().handleReset();
    // });
  // });
});
