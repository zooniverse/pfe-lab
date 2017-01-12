import { expect } from 'chai';
import nock from 'nock';

import * as actionTypes from '../../src/constants/action-types';
import * as panoptes from '../../src/services/panoptes';

const stagingHost = 'https://panoptes-staging.zooniverse.org';

describe('Panoptes', () => {
  describe('with no user', function (done) {
    let lastAction = null;

    const scope = nock(stagingHost)
      .get(/^\/oauth\/authorize/)
      .reply(302, '', {
        'Cache-Control': 'no-cache',
        'location': 'https://panoptes-staging.zooniverse.org/users/sign_in',
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
        'X-Frame-Options': 'SAMEORIGIN',
        'X-XSS-Protection': '1; mode=block',
      });

    scope
      .get(/^\/api\/me/)
      .reply(401);

    panoptes.checkLoginUser((action) => { lastAction = action; }).then(() => {
      nock.removeInterceptor(scope);
      done();
    });

    it('should know that nobody is logged in', function () {
      expect(lastAction).to.not.be.null;
      expect(lastAction.type).to.equal(actionTypes.SET_LOGIN_USER);
      expect(lastAction.user).to.be.null;
    });
  });
});
