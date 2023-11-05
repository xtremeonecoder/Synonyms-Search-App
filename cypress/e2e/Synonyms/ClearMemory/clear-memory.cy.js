/**
 * Synonyms Search Tool
 *
 * @category   Application_Frontend
 * @package    synonym-search-frontend
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 */

/// <reference types="cypress" />

context('Clear Memory Feature', () => {
  before(() => {
    // Add word "Nice" with synonyms "Beautiful,Charming"
    cy.addSynonyms({});
  });

  beforeEach(() => {
    setup();
  });

  it('should show clear memory popup on clear button click', () => {
    cy.get('.confirm-modal-overlay')
      .should('be.visible')
      .within((modal) => {
        // Open clear memory popup
        cy.wrap(modal).find('button:contains("Yes")').should('be.visible');
        cy.wrap(modal).find('button:contains("No")').should('be.visible');

        // We should on the app home page
        cy.url().should('include', ':3000/');
      });
  });

  it('should close the popup without clearing memory on No button click', () => {
    // Assert no button action
    cy.get('.confirm-modal-overlay')
      .should('be.visible')
      .within((modal) => {
        cy.wrap(modal).find('button:contains("No")').should('be.visible').click();
        cy.root().get('button:contains("Yes")').should('not.exist');
        cy.root().get('button:contains("No")').should('not.exist');
      });

    // We should on the app home page
    cy.url().should('include', ':3000/');

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

        // Submit form
        cy.root().submit();
      });

    // Result pan should show synonyms list of Nice
    cy.get('div[data-testid="result-pan"]')
      .should('exist')
      .and('be.visible')
      .within((results) => {
        // Result pan should show synonyms list of Nice
        cy.fixture('synonyms/data').then(async ({ inputData }) => {
          const synonyms = inputData[2].synonyms.split(',');
          cy.wrap(results).should('be.visible').contains(synonyms[0]);
          cy.wrap(results).should('be.visible').contains(synonyms[1]);
        });
      });
  });

  it('should clear memory and close the popup on Yes button click', () => {
    // Assert yes button action
    cy.get('.confirm-modal-overlay')
      .should('be.visible')
      .within((modal) => {
        cy.wrap(modal).find('button:contains("Yes")').should('be.visible').click();

        // After yes button click, popup should be closed
        cy.root().get('button:contains("Yes")').should('not.exist');
        cy.root().get('button:contains("No")').should('not.exist');
      });

    // Assert successful alert message
    cy.get('.Toastify__toast-body')
      .should('exist')
      .and('be.visible')
      .contains('Memory data cleared successfully!');

    // We should on the app home page
    cy.url().should('include', ':3000/');

    // Search synonyms with word Nice
    cy.get('#search-synonyms-form')
      .should('exist')
      .and('be.visible')
      .within((form) => {
        // Fill the form
        cy.fixture('synonyms/data').then(async ({ searchKey }) => {
          // Search synonyms of the word: Nice
          cy.wrap(form).find('input[name="word"]').clear().type(searchKey[2]);
        });

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

  const setup = () => {
    // Navigate to the app home page
    cy.visit('/');

    // We should be redirected to app home page
    cy.url().should('include', ':3000/');

    // Assert the application name
    cy.get('h1').should('exist').and('be.visible').contains('Synonym Search Tool');

    // Click on clear synonyms button
    cy.get('button[data-testid="clear-button"]').should('exist').and('be.visible').click();

    // We should on the app home page
    cy.url().should('include', ':3000/');
  };
});
