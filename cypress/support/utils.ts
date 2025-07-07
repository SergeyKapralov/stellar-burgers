export const INGREDIENTS = {
  bun: '643d69a5c3f7b9001cfa093d',
  meat: '643d69a5c3f7b9001cfa0940',
  sauce: '643d69a5c3f7b9001cfa0942',
  secondSauce: '643d69a5c3f7b9001cfa0943',
  veg: '643d69a5c3f7b9001cfa093e',
};

export const expectConstructorToContain = {
  bun(text: string) {
    cy.get('[data-cy="constructor-bun-top"]').should('contain', text);
    cy.get('[data-cy="constructor-bun-bottom"]').should('contain', text);
  },
  ingredient(text: string) {
    cy.get('[data-cy="constructor-ingredients"]').should('contain', text);
  },
  price(amount: string | number) {
    cy.get('[data-cy="constructor-price"]').should('contain', amount);
  }
};

export const setupInterceptors = (isAuthorized = false) => {
  cy.intercept('GET', '**/api/ingredients', {
    fixture: 'ingredients.json'
  }).as('getIngredients');

  cy.intercept('GET', '**/api/auth/user', isAuthorized
    ? { fixture: 'user.json' }
    : { statusCode: 401, body: { success: false, message: 'Unauthorized' } }
  ).as('getUser');

  cy.intercept('POST', '**/api/orders', { fixture: 'order.json' }).as('createOrder');
};