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

    it('should know that nobody is logged in', function (done) {
      panoptes.checkLoginUser((action) => {
        expect(action).to.not.be.null;
        expect(action.type).to.equal(actionTypes.SET_LOGIN_USER);
        expect(action.user).to.be.null;
        done();
      });
    });
  });

  xdescribe('with a valid user--this test is failing because of a bug in panoptes-client', function() {
    before(function() {
      nock.cleanAll();
      nock(stagingHost)
        .get(/^\/oauth\/authorize/)
        .reply(302, '', {
          'location': 'https://localhost:3000',
          'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
          'X-Frame-Options': 'SAMEORIGIN',
          'X-XSS-Protection': '1; mode=block',
        });

      nock(stagingHost)
        .get(/^\/api\/me/)
        .reply(200, {
          users: [user],
        });
    });

    it('should know when somebody is logged in', function(done) {
      panoptes.checkLoginUser((action) => {
        try {
          expect(action).to.not.be.null;
          expect(action.type).to.equal(actionTypes.SET_LOGIN_USER);
          expect(action.user).to.not.be.null;
          expect(action.user.id).to.equal(user.id);
          expect(action.user.login).to.equal(user.login);
          done();
        } catch (ex) {
          done(ex);
        }
      });
    });
  });
});
