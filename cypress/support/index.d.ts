
declare namespace Cypress {
  interface Chainable {
    addIngredient(id: string): Chainable<JQuery<HTMLElement>>;
    openIngredientModal(id: string): Chainable<JQuery<HTMLElement>>;
    setupAuthorizedSession(): void;
  }
}