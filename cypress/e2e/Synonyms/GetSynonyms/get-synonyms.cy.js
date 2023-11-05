/**
 * Synonyms Search Tool
 *
 * @category   Application_Frontend
 * @package    synonym-search-frontend
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 */

/// <reference types="cypress" />

context('Get Synonyms Feature', () => {
  before(() => {
    // Add word "Nice" with synonyms "Beautiful,Charming"
    cy.addSynonyms({});
  });

  beforeEach(() => {
    setup();
  });

  it('should show search synonyms form on app home', () => {
    cy.get('#search-synonyms-form')
      .should('exist')
      .and('be.visible')
      .within((form) => {
        // Search synonyms form exists
        cy.wrap(form).find('input[name="word"]').should('exist').and('be.visible');
        cy.wrap(form)
          .find('button[type="submit"]')
          .should('exist')
          .and('be.visible')
          .contains('Lookup Synonyms');

        // We should on the app home page
        cy.url().should('include', ':3000/');
      });
  });

  it('should show error message if search with empty keyword', () => {
    // Search synonyms with word
    cy.get('#search-synonyms-form')
      .should('exist')
      .and('be.visible')
      .within((form) => {
        // Submit search synonyms form empty
        cy.root().submit();

        // Assert error messages
        // Required fields shows error messages
        cy.wrap(form).find('p.error').eq(0).should('not.be.empty');
      });

    // Result pan shows no result message
    cy.get('div[data-testid="result-pan"]')
      .should('exist')
      .and('be.visible')
      .contains('Sorry, no synonyms found for the given word!');

    // We should on the app home page
    cy.url().should('include', ':3000/');
  });

  it('should show list of synonyms on successful search', () => {
    // Search synonyms with word
    cy.get('#search-synonyms-form')
      .should('exist')
      .and('be.visible')
      .within((form) => {
        // Fill the form
        cy.fixture('synonyms/data').then(async ({ searchKey }) => {
          // Search keyword is: Nice
          cy.wrap(form).find('input[name="word"]').clear().type(searchKey[2]);
        });

        // Assert no error messages
        cy.wrap(form).find('p.error').eq(0).should('be.empty');

        // Submit form
        cy.root().submit();
      });

    // Result pan should show synonyms list
    cy.get('div[data-testid="result-pan"]')
      .should('exist')
      .and('be.visible')
      .within((results) => {
        // Result pan should not show not found message
        cy.wrap(results).should('not.have.text', 'Sorry, no synonyms found for the given word!');

        // Result pan should show synonyms list
        cy.fixture('synonyms/data').then(async ({ inputData }) => {
          const synonyms = inputData[2].synonyms.split(',');
          cy.wrap(results).should('be.visible').contains(synonyms[0]);
          cy.wrap(results).should('be.visible').contains(synonyms[1]);
        });
      });

    // We should on the app home page
    cy.url().should('include', ':3000/');
  });

  it('should show not found message on unknown search key', () => {
    // Search synonyms with word
    cy.get('#search-synonyms-form')
      .should('exist')
      .and('be.visible')
      .within((form) => {
        // Fill the form
        cy.fixture('synonyms/data').then(async ({ searchKey }) => {
          // Search synonyms of the word: Charming
          cy.wrap(form).find('input[name="word"]').clear().type(searchKey[5]);
        });

        // Assert no error messages
        cy.wrap(form).find('p.error').eq(0).should('be.empty');

        // Submit form
        cy.root().submit();
      });

    // Result pan should show not found message
    cy.get('div[data-testid="result-pan"]')
      .should('exist')
      .and('be.visible')
      .should('not.have.text', 'Sorry, no synonyms found for the given word!');

    // Assert not found alert message
    cy.get('.Toastify__toast-body').should('exist').and('be.visible').contains('Word not found!');

    // We should on the app home page
    cy.url().should('include', ':3000/');
  });

  it('should show list of synonyms, clicking on search result words', () => {
    // Add word "Beautiful" with synonyms "Beauty,Pretty"
    cy.fixture('synonyms/data').then(async ({ inputData }) => {
      cy.addSynonyms(inputData[3]);
    });

    // Search synonyms with word
    cy.get('#search-synonyms-form')
      .should('exist')
      .and('be.visible')
      .within((form) => {
        // Fill the form
        cy.fixture('synonyms/data').then(async ({ searchKey }) => {
          // Search synonyms of the word: Nice
          cy.wrap(form).find('input[name="word"]').clear().type(searchKey[2]);
        });

        // Assert no error messages
        cy.wrap(form).find('p.error').eq(0).should('be.empty');

        // Submit form
        cy.root().submit();
      });

    // Result pan should show synonyms list
    cy.get('div[data-testid="result-pan"]')
      .should('exist')
      .and('be.visible')
      .within((results) => {
        // Result pan should not show not found message
        cy.wrap(results).should('not.have.text', 'Sorry, no synonyms found for the given word!');

        // Result pan should show synonyms list
        cy.fixture('synonyms/data').then(async ({ inputData, searchKey }) => {
          // Formulate data
          const synonymsOfNice = inputData[2].synonyms.split(','); // Beautiful,Charming
          const synonymsOfBeautiful = inputData[3].synonyms.split(','); // Beauty,Pretty

          // Check if the expected synonyms are in the list
          cy.wrap(results).should('be.visible').contains(synonymsOfNice[0]); // Beautiful
          cy.wrap(results).should('be.visible').contains(synonymsOfNice[1]); // Charming
          cy.wrap(results).should('be.visible').contains(synonymsOfBeautiful[0]); // Beauty
          cy.wrap(results).should('be.visible').contains(synonymsOfBeautiful[1]); // Pretty

          // Click on the word "Beautiful" should show its synonyms
          cy.wrap(results).find(`a:contains("${synonymsOfNice[0]}")`).should('be.visible').click();

          // Check if the expected synonyms are in the list
          cy.wrap(results).should('be.visible').contains(searchKey[2]); // Nice
          cy.wrap(results).should('be.visible').contains(synonymsOfNice[1]); // Charming
          cy.wrap(results).should('be.visible').contains(synonymsOfBeautiful[0]); // Beauty
          cy.wrap(results).should('be.visible').contains(synonymsOfBeautiful[1]); // Pretty
        });
      });

    // We should on the app home page
    cy.url().should('include', ':3000/');
  });

  it('should show not found message, clicking on search result word which does not exist', () => {
    // Add a new unknown synonym in word: Nice
    cy.addSynonyms({ word: 'Nice', synonyms: 'Unknownword' });

    // Search synonyms with word
    cy.get('#search-synonyms-form')
      .should('exist')
      .and('be.visible')
      .within((form) => {
        // Search synonyms of the word: Nice
        cy.wrap(form).find('input[name="word"]').clear().type('Nice');

        // Assert no error messages
        cy.wrap(form).find('p.error').eq(0).should('be.empty');

        // Submit form
        cy.root().submit();
      });

    // Result pan should show synonyms list
    cy.get('div[data-testid="result-pan"]')
      .should('exist')
      .and('be.visible')
      .within((results) => {
        // Result pan should not show not found message
        cy.wrap(results).should('not.have.text', 'Sorry, no synonyms found for the given word!');

        // Result pan should show synonyms list
        // Check if synonyms of Nice = Beautiful, Charming are there
        cy.wrap(results).should('be.visible').contains('Unknownword');

        // Clicking on the word "Unknownword" should show not found message
        // As the word "Unknownword" does not have any synonyms yet
        cy.wrap(results).find(`a:contains("Unknownword")`).should('be.visible').click();
      });

    // Assert not found alert message
    cy.get('.Toastify__toast-body').should('exist').and('be.visible').contains('Word not found!');

    // We should on the app home page
    cy.url().should('include', ':3000/');
  });

  it('should follow transitive rule for related synonyms', () => {
    // Add another word with synonyms
    cy.fixture('synonyms/data').then(async ({ inputData }) => {
      // B is a synonym of A
      cy.addSynonyms(inputData[0]);
      // C is a synonym of B
      cy.addSynonyms(inputData[1]);
    });

    // Search synonyms with word
    cy.get('#search-synonyms-form')
      .should('exist')
      .and('be.visible')
      .within((form) => {
        // Fill the form
        cy.fixture('synonyms/data').then(async ({ searchKey }) => {
          // Fetch the synonyms of A
          cy.wrap(form).find('input[name="word"]').clear().type(searchKey[0]);
        });

        // Assert no error messages
        cy.wrap(form).find('p.error').eq(0).should('be.empty');

        // Submit form
        cy.root().submit();
      });

    // Result pan should show synonyms list
    cy.get('div[data-testid="result-pan"]')
      .should('exist')
      .and('be.visible')
      .within((results) => {
        // Result pan should not show not found message
        cy.wrap(results).should('not.have.text', 'Sorry, no synonyms found for the given word!');

        // Result pan should show synonyms list
        cy.fixture('synonyms/data').then(async ({ inputData, searchKey }) => {
          // Formulate data
          const synonymsOfA = inputData[0].synonyms.split(','); // B
          const synonymsOfB = inputData[1].synonyms.split(','); // C

          // Accroding to transitive rule, B and C will be synonyms of A
          cy.wrap(results).should('be.visible').contains(synonymsOfA[0]); // B
          cy.wrap(results).should('be.visible').contains(synonymsOfB[0]); // C

          // Clicking on synonym B should show synonyms list of B
          cy.wrap(results).find(`a:contains("${synonymsOfA[0]}")`).should('be.visible').click();

          // Accroding to transitive rule, C and A will be synonyms of B
          cy.wrap(results).should('be.visible').contains(synonymsOfB[0]); // C
          cy.wrap(results).should('be.visible').contains(searchKey[0]); // A
        });
      });

    // We should on the app home page
    cy.url().should('include', ':3000/');
  });

  const setup = () => {
    // Navigate to the app home page
    cy.visit('/');

    // We should be redirected to app home page
    cy.url().should('include', ':3000/');

    // Assert the application name
    cy.get('h1').should('exist').and('be.visible').contains('Synonym Search Tool');

    // We should on the app home page
    cy.url().should('include', ':3000/');
  };
});
