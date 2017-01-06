import { expect } from 'chai';

import * as actionTypes from '../../../src/constants/action-types';
import { setLoginUser } from '../../../src/modules/users/action-creators';

import { user } from './test-data';

describe('UserActionCreators', () => {
  it('should build the action correctly when the user given is not null', () => {
    const userAction = setLoginUser(user);

    expect(userAction.type).to.equal(actionTypes.SET_LOGIN_USER);
    expect(userAction.user).to.not.be.null;
    expect(userAction.user.id).to.equal(user.id);
  });
  it('should build the action correctly when the user given is null', () => {
    const userAction = setLoginUser(null);

    expect(userAction.type).to.equal(actionTypes.SET_LOGIN_USER);
    expect(userAction.user).to.be.null;
  });
});
