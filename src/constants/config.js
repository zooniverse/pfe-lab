const DEFAULT_ENV = 'development';

function locationMatch(regex) {
  let match;
  if (typeof location !== 'undefined' && location !== null) {
    match = location.search.match(regex);
  }
  return (match && match[1]) ? match[1] : undefined;
}

const envFromBrowser = locationMatch(/\W?env=(\w+)/);
const envFromShell = process.env.NODE_ENV;
const env = envFromBrowser || envFromShell || DEFAULT_ENV;

if (!env.match(/^(production|staging|development)$/)) {
  throw new Error(`Error: Invalid Environment - ${envFromShell}`);
}

const API_APPLICATION_IDS = {
  production: '07a0c708a51018858aa36af81f2e757d970e5ca37fc59ff892114c32f8a0c79d',
  staging: 'a6965f9d7fbe7e921cbf1fc032a02c1b1cc4652cbd6823256a7cc5944ae2c4e1',
  development: 'a6965f9d7fbe7e921cbf1fc032a02c1b1cc4652cbd6823256a7cc5944ae2c4e1'
};

const ZOONIVERSE_URL = {
  production: 'https://www.zooniverse.org',
  staging: 'https://master.pfe-preview.zooniverse.org',
  development: 'https://master.pfe-preview.zooniverse.org'
};

export const config = { // eslint-disable-line import/prefer-default-export
  panoptesAppId: API_APPLICATION_IDS[env],
  zooniverseURL: ZOONIVERSE_URL[env]
};
