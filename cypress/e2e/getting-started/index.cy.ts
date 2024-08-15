describe('Getting started', () => {
  beforeEach(() => {
    const AppUrl = Cypress.env('appUrl');
    const username = Cypress.env('username');
    const password = Cypress.env('password');

    cy.login(username, password);
    cy.visit(AppUrl);
  });

  it('Should enter app', () => {
    expect(cy.get('h2').should('have.text', 'Edit me!!'));
  });
});
