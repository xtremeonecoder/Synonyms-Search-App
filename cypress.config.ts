/**
 * Synonyms Search Tool
 *
 * @category   Application_Frontend
 * @package    synonym-search-frontend
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 */

import { defineConfig } from 'cypress';

export default defineConfig({
  defaultCommandTimeout: 10000,
  env: {
    // add environment variables
    apiUrl: 'http://localhost:3001/api/synonyms',
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
