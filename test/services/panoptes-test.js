import { expect } from 'chai';
import nock from 'nock';

import * as actionTypes from '../../src/constants/action-types';
import * as panoptes from '../../src/services/panoptes';

import { user } from '../modules/users/test-data';

let lastAction = null;

const testDispatch = (doneFunc, action) => {
  lastAction = action;
  doneFunc();
};


xdescribe('Panoptes', function des() {
  describe('with a user', function desc() {
    before(function bef(done) {
      nock('https://panoptes-staging.zooniverse.org')
        .get(/^\/oauth\/authorize/)
        .reply(302, '', {
          location: 'https://localhost:3000',
          'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
          'X-Frame-Options': 'SAMEORIGIN',
          'X-XSS-Protection': '1; mode=block',
        });

      nock('https://panoptes-staging.zooniverse.org')
        .get(/^\/api\/me/)
        .reply(200, {
          users: [user],
        });

      panoptes.checkLoginUser(testDispatch.bind(null, done));
    });
    it('should know when somebody is logged in', () => {
      expect(lastAction).to.not.be.null;
      expect(lastAction.type).to.equal(actionTypes.SET_LOGIN_USER);
      expect(lastAction.user).to.not.be.null;
      expect(lastAction.user.id).to.equal(user.id);
      expect(lastAction.user.login).to.equal(user.login);
    });
  });
});
