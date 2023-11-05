/**
 * Synonyms Search Tool
 *
 * @category   Application_Frontend
 * @package    synonym-search-frontend
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 */

/// <reference types="cypress" />

context('Add Synonyms Feature', () => {
  beforeEach(() => {
    setup();
  });

  it('should show add synonyms form on add button click', () => {
    cy.get('#create-synonyms-form')
      .should('exist')
      .and('be.visible')
      .within((form) => {
        // Open create synonyms form
        cy.wrap(form).find('button[type="submit"]').should('have.text', 'Add Synonyms');

        // We should on the app home page
        cy.url().should('include', ':3000/');
      });
  });

  it('should close create synonyms form on cross button click', () => {
    cy.get('.modal-overlay')
      .should('exist')
      .and('be.visible')
      .within((modal) => {
        cy.wrap(modal).find('#create-synonyms-form').should('be.visible');
        cy.wrap(modal).find('button:contains("x")').should('be.visible').click();
        cy.root().get('#create-synonyms-form').should('not.exist');

        // We should on the app home page
        cy.url().should('include', ':3000/');
      });
  });

  it('should show error messages if required fields are empty', () => {
    cy.get('#create-synonyms-form')
      .should('exist')
      .and('be.visible')
      .within((form) => {
        // Submit create synonyms form empty
        cy.root().submit();

        // Assert error messages
        // Required fields shows error messages
        cy.wrap(form).find('p.error').eq(0).should('not.be.empty');
        cy.wrap(form).find('p.error').eq(2).should('not.be.empty');

        // We should on the app home page
        cy.url().should('include', ':3000/');
      });

    // Popup modal should exist
    cy.get('#create-synonyms-form').should('exist').and('be.visible');
  });

  it('should show success message on successful synonyms creation', () => {
    cy.get('#create-synonyms-form')
      .should('exist')
      .and('be.visible')
      .within((form) => {
        // Fill the form
        cy.wrap(form).find('input[name="word"]').clear().type('Nice');
        cy.wrap(form).find('input[name="synonyms"]').clear().type('Beautiful,Charming');

        // Assert no error messages
        cy.wrap(form).find('p.error').eq(0).should('be.empty');
        cy.wrap(form).find('p.error').eq(1).should('be.empty');

        // Submit form
        cy.root().submit();
      });

    // Assert successful alert message
    cy.get('.Toastify__toast-body')
      .should('exist')
      .and('be.visible')
      .contains('Synonyms added successfully!');

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

    // Click on add synonyms button
    cy.get('button[data-testid="add-button"]').should('exist').and('be.visible').click();

    // We should on the app home page
    cy.url().should('include', ':3000/');
  };
});
