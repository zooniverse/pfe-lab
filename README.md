# Panoptes-Front-End Lab

PFE Lab is the UI interface for the Zooniverse Lab. 

## Usage

__Install the dependencies:__

`npm install`

__Development mode with livereload:__

`npm run start`

__When you are done, create a production-ready version of the JS bundle:__

```npm run _build-production```

## Deployment

Deployment is handled by Github Action. Both staging and production deployment can be run ad hoc in the actions tab as needed if you have the appropriate permissions on the repository.

### Staging

On opening of pull requests, a Github Action is triggered to deploy to a branch staging location. The blob storage location depends on the pull request number, e.g. `https://pr-214.lab-preview.zooniverse.org`. Note: For authentication, you will need to add the staged URL to Doorkeeper.

On push to master, a Github Action is triggered to deploy to master staging found at `https://master.lab-preview.zooniverse.org`. 

### Production

Production deployments are triggered by an update to which commit the `production-release` tag is pointed to. This tag should be updated via chat ops and then a Github Action will run that builds and uploads the files to our cloud provider found at `https://lab.zooniverse.org`.

## Testing

- If you write a new component, write a test. Each component should have its own `-test.js` file.
- The test runner is [Mocha](https://mochajs.org/), assertion library is [Chai](http://chaijs.com/), and [Enzyme](http://airbnb.io/enzyme/) is available for testing React components. [Sinon](http://sinonjs.org/) is used for standalone test spies, stubs, and mocks.
- You can run the tests with `npm run test`.
- Tests are also run by Github Actions as part of a CI check on pull requests

## CSS Conventions

- Keep common base styles and variables in **common.styl**. 
- For a given component, pick a unique top-level class name for that component and nest child classes under it. 
- Stylus formatting: Yes colons, no semicolons, no braces. 
- `@extends` up top, then properties (alphabetically), then descendant selectors. 
- Prefer use of `display: flex` and `flex-wrap: wrap` to explicit media queries wherever possible.
- We are using [Zoo Grommet](https://github.com/zooniverse/zoo-grommet), a Zooniverse theme from the [Grommet](https://grommet.github.io/) React component library.
- We are using [BEM](http://getbem.com/introduction/) for CSS naming conventions.

## ESLint

- An [ESLint](https://eslint.org/) configuration file is setup in the root of the repository for you to use with your text editor to lint both ES6 and use [Airbnb's React style guide](https://github.com/airbnb/javascript/tree/master/react).
- ESLint can be run from the CLI with `eslint path/to/local/file.jsx`.

## Credits

Based on the [Zooniverse Redux starter template](https://github.com/zooniverse/zoo-reduxify/), which in turn was based on the original [React Starterify](https://github.com/Granze/react-starterify) (used under the [MIT License](http://opensource.org/licenses/MIT)).

## License

Copyright 2017 Zooniverse

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
