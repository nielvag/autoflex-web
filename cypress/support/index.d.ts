/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      resetTestDb(): Chainable<Response<any>>;
    }
  }
}

export {};
