import { expect } from 'chai';

import initialState from '../../../src/initial-state';
import { user, userAction, noUserAction, bogusAction } from './test-data';

import reducer from '../../../src/modules/users/reducer';

describe('UserReducer', () => {
  it('should update handle setting a non-null user correctly', () => {
    const newState = reducer(initialState, userAction);

    expect(newState.user).to.not.be.null;
    expect(newState.user.id).to.equal(user.id);
    expect(newState.initialized).to.be.true;
  });
  it('should update handle setting a null user correctly', () => {
    const newState = reducer(initialState, noUserAction);

    expect(newState.user).to.be.null;
    expect(newState.initialized).to.be.true;
  });
  it('shouldn\'t touch things it doesn\'t know about', () => {
    const newState = reducer(initialState, noUserAction);

    expect(newState.organization).to.be.undefined;
    expect(newState.organizations).to.be.undefined;
  });
  it('shouldn\'t respond to unknown actions', () => {
    const newState = reducer(initialState, bogusAction);

    expect(newState).to.equal(initialState);
  });
});
