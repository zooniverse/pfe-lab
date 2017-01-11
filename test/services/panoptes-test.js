import { expect } from 'chai';
import nock from 'nock';

import oauth from 'panoptes-client/lib/oauth';

import * as actionTypes from '../../src/constants/action-types';
import * as panoptes from '../../src/services/panoptes';

import { user } from '../modules/users/test-data';

describe('Panoptes', () => {
  beforeEach(function () {
    oauth.checkCurrent().then((u) => {
      if (u) {
        nock('https://panoptes-staging.zooniverse.org')
          .get(/^\/users\/sign_in/)
          .reply(200, '', {
            'x-csrf-token': 'abcdefghijk',
          });

        nock('https://panoptes-staging.zooniverse.org')
          .delete(/^\/users\/sign_out/)
            .reply(200);

        return panoptes.logoutFromPanoptes(() => {});
      }

      return Promise.resolve(null);
    });
  });

  describe('with a valid user', function (done) {
    let lastAction = null;
    nock('https://panoptes-staging.zooniverse.org')
      .get(/^\/oauth\/authorize/)
      .reply(302, '', {
        'location': 'https://localhost:3000',
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
        'X-Frame-Options': 'SAMEORIGIN',
        'X-XSS-Protection': '1; mode=block',
      });

    nock('https://panoptes-staging.zooniverse.org')
      .get(/^\/api\/me/)
      .reply(200, {
        users: [user],
      });

    // panoptes.checkLoginUser(testDispatch.bind(null, done));
    panoptes.checkLoginUser((action) => { lastAction = action; }).then(() => {
      done();
    });

    it('should know when somebody is logged in', function () {
      expect(lastAction).to.not.be.null;
      expect(lastAction.type).to.equal(actionTypes.SET_LOGIN_USER);
      expect(lastAction.user).to.not.be.null;
      expect(lastAction.user.id).to.equal(user.id);
      expect(lastAction.user.login).to.equal(user.login);
    });
  });

  xdescribe('with no user', function (done) {
    let lastAction = null;
    nock('https://panoptes-staging.zooniverse.org')
      .get(/^\/oauth\/authorize/)
      .reply(302, '', {
        'Cache-Control': 'no-cache',
        'location': 'https://panoptes-staging.zooniverse.org/users/sign_in',
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
        'X-Frame-Options': 'SAMEORIGIN',
        'X-XSS-Protection': '1; mode=block',
      });

    nock('https://panoptes-staging.zooniverse.org')
      .get(/^\/users\/sign_in/)
      .reply(200, '', {
        'x-csrf-token': 'abcdefghijk',
      });

    panoptes.checkLoginUser((action) => { lastAction = action; }).then(() => {
      done();
    });

    it('should know that nobody is logged in', function () {
      expect(lastAction).to.not.be.null;
      expect(lastAction.type).to.equal(actionTypes.SET_LOGIN_USER);
      expect(lastAction.user).to.be.null;
    });
  });
});
