import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { UserSearch } from 'zooniverse-react-components';

import CollaboratorCreator from '../../../../src/modules/organizations/containers/collaborator-creator-container';
import FormContainer from '../../../../src/modules/common/containers/form-container';

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
    wrapper = shallow(<CollaboratorCreator
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

  // TODO: React-Select doesn't consistently fire onchange events when the input is changed.
  // Consider alternative for simple async search.
  // describe('handleChange event', function() {
  //   let roleCheckbox;
  //   before(function() {
  //     wrapper = mount(<CollaboratorCreator
  //       addCollaborators={addCollaborators}
  //       possibleRoles={POSSIBLE_ROLES}
  //       rolesInfo={ROLES_INFO}
  //     />);
  //     roleCheckbox = wrapper.find('#LAB_COLLABORATORS_PAGE_collaborator');
  //   });

  //   afterEach(function() {
  //     wrapper.instance().handleReset();
  //   });

  //   it('should not set disabledSubmit state to false if form is partially filled', function() {
  //     roleCheckbox.simulate('change', { target: { checked: true } });
  //     expect(wrapper.state('disabledSubmit')).to.be.true;
  //   });

  //   it('should set disabledSubmit state to false if form is fully filled', function() {
  //     roleCheckbox = wrapper.find('#LAB_COLLABORATORS_PAGE_collaborator');
  //     roleCheckbox.render().prop('checked', true);
  //     roleCheckbox.simulate('change', { target: { checked: true } });
  //     wrapper.update()
  //     console.log('roleCheckbox', roleCheckbox.props())
  //     wrapper.instance().userSearch.onChange(['srallen086']);
  //     console.log(roleCheckbox.html())
  //     console.log('wrapper', roleCheckbox.prop('checked'), wrapper.state())
  //     // wrapper.instance().handleChange();
  //     expect(wrapper.state('disabledSubmit')).to.be.false;
  //   });
  // });
});
