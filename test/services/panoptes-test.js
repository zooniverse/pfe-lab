import { expect } from 'chai';
import nock from 'nock';

import * as actionTypes from '../../src/constants/action-types';
import * as panoptes from '../../src/services/panoptes';

let lastAction = null;

const testDispatch = (doneFunc, action) => {
  lastAction = action;
  doneFunc();
};

describe('Panoptes', () => {
  it('should know when nobody is logged in', (done) => {
    nock('https://panoptes-staging.zooniverse.org')
      .get(/^\/oauth\/authorize/)
      .reply(302, '', {
        location: 'https://panoptes-staging.zooniverse.org/users/sign_in',
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
        'X-Frame-Options': 'SAMEORIGIN',
        'X-XSS-Protection': '1; mode=block',
      });

    panoptes.checkLoginUser(testDispatch.bind(this, done()));

    expect(lastAction).to.not.be.null;
    expect(lastAction.type).to.equal(actionTypes.SET_LOGIN_USER);
    expect(lastAction.user).to.be.null;
  });
});
