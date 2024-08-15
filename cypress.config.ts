/* eslint-disable @typescript-eslint/no-var-requires */
import { defineConfig } from 'cypress';
import browserify from '@cypress/browserify-preprocessor';
import pathmodify from 'pathmodify';
import path from 'path';

const options = browserify.defaultOptions;

export default defineConfig({
  chromeWebSecurity: false,

  env: {
    appUrl: 'http://localhost:3000',
    username: '',
    password: '',

    codeCoverage: {
      url: '/api/__coverage__',
    },
  },

  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config);

      return config;
    },
  },

  e2e: {
    baseUrl: 'http://localhost:3000/',
    supportFile: 'cypress/support/e2e.ts',
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config);
      options.browserifyOptions.transform[1][1].babelrc = true;
      options.typescript = require.resolve('typescript');

      options.browserifyOptions.plugin.unshift([
        pathmodify,
        {
          mods: [pathmodify.mod.dir('@', path.resolve(__dirname, './src'))],
        },
      ]);

      on('file:preprocessor', browserify(options));

      return config;
    },
  },
});
