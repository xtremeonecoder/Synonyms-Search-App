/**
 * Synonyms Search Tool
 *
 * @category   Application_Frontend
 * @package    synonym-search-frontend
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 */

/// <reference types="cypress" />

import http from '../../src/services/Http';
import { ISynonyms } from '../../src/data-structure/Interfaces';

// Register commands
export function registerCommands() {
  Cypress.Commands.add('submitSearchForm', (word) => {
    cy.get('input[name="word"]').clear().type(word);
    cy.root().submit();
  });

  Cypress.Commands.add('submitAddSynonymsForm', (word, synosyms) => {
    cy.get('input[name="word"]').clear().type(word);
    cy.get('input[name="synosyms"]').clear().type(synosyms);
    cy.root().submit();
  });

  Cypress.Commands.add('addSynonyms', (data) => {
    cy.fixture('synonyms/data').then(async ({ inputData }) => {
      // Formulate data
      const word = data.word ?? inputData[2].word;
      const arraySynonyms = (data.synonyms ?? inputData[2].synonyms)
        ?.split(',')
        .map((synonym) => synonym.trim());

      // Send add synonyms request
      await http.post(Cypress.env('apiUrl'), { word, synonyms: arraySynonyms });
    });
  });
}

declare global {
  namespace Cypress {
    interface Chainable {
      addSynonyms(data: Partial<ISynonyms>): Chainable<void>;
      submitSearchForm(word: string): Chainable<void>;
      submitAddSynonymsForm(word: string, synosyms: string): Chainable<void>;
    }
  }
}
