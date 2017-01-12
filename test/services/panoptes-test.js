import { expect } from 'chai';
import nock from 'nock';

import * as actionTypes from '../../src/constants/action-types';
import * as panoptes from '../../src/services/panoptes';

import { user } from '../modules/users/test-data';

const stagingHost = 'https://panoptes-staging.zooniverse.org';

describe('Panoptes', () => {
  afterEach(function (done) {
    nock.cleanAll();
    nock.disableNetConnect();
    done();
  });

  beforeEach(function (done) {
    nock.cleanAll();
    nock.disableNetConnect();
    done();
  });

  describe('with a valid user', function (done) {
    let lastAction = null;

    const scope = nock(stagingHost)
      .get(/^\/oauth\/authorize/)
      .reply(302, '', {
        'location': 'https://localhost:3000',
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
        'X-Frame-Options': 'SAMEORIGIN',
        'X-XSS-Protection': '1; mode=block',
      });

    scope
      .get(/^\/api\/me/)
      .reply(200, {
        users: [user],
      });

    panoptes.checkLoginUser((action) => { lastAction = action; }).then(() => {
      nock.removeInterceptor(scope);
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
});
