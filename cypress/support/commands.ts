/// <reference types="cypress" />

Cypress.Commands.add('login' as any, (email: string, password: string) => {
  const args = { email, password };

  cy.session(args, () => {
    cy.visit('localhost:3000');

    cy.origin(
      'https://id.ghtklab.com/',
      {
        args,
      },
      ({ email, password }) => {
        cy.get('#__BVID__17').type(email);
        cy.get('#__BVID__21').type(password);

        cy.get('.btn.btn-success.btn-block').click();
      }
    );

    cy.wait(3000);

    cy.url().should('include', 'localhost:3000');
  });
});

export {};
