/* eslint-disable no-unused-vars */
declare namespace Cypress {
  interface Chainable {
    login(username: string, password: string): void;
    getUser(token: string): Chainable<Response>;
  }
}
