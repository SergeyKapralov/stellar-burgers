import {
  INGREDIENTS,
  expectConstructorToContain,
  setupInterceptors
} from '../support/utils';

describe('Burger Constructor', () => {
  beforeEach(() => {
    setupInterceptors();
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('добавляет ингредиенты в конструктор', () => {
    cy.addIngredient(INGREDIENTS.bun);
    expectConstructorToContain.bun('Флюоресцентная булка R2-D3');

    cy.addIngredient(INGREDIENTS.meat);
    expectConstructorToContain.ingredient('Говяжий метеорит (отбивная)');

    cy.addIngredient(INGREDIENTS.sauce);
    expectConstructorToContain.ingredient('Соус Spicy-X');

    expectConstructorToContain.price(5066);
  });

  it('открывает модалку ингредиента', () => {
    cy.openIngredientModal(INGREDIENTS.meat);

    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('[data-cy="ingredient-details"]').should('be.visible');
    cy.get('[data-cy="ingredient-details"]').should(
      'contain',
      'Говяжий метеорит (отбивная)'
    );
    cy.get('[data-cy="ingredient-calories"]').should('contain', '2674');
    cy.get('[data-cy="ingredient-proteins"]').should('contain', '800');
    cy.get('[data-cy="ingredient-fat"]').should('contain', '800');
    cy.get('[data-cy="ingredient-carbohydrates"]').should('contain', '300');
  });

  it('закрывает модалку через крестик', () => {
    cy.openIngredientModal(INGREDIENTS.meat);
    cy.get('[data-cy="modal-close"]').find('svg').click({ force: true });
    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('закрывает модалку через overlay', () => {
    cy.openIngredientModal(INGREDIENTS.meat);
    cy.get('[data-cy="modal-overlay"]').click({ force: true });
    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('создаёт заказ', () => {
    setupInterceptors(true);
    cy.setupAuthorizedSession();
    cy.reload();
    cy.wait('@getIngredients');

    cy.addIngredient(INGREDIENTS.bun);
    cy.addIngredient(INGREDIENTS.meat);
    cy.addIngredient(INGREDIENTS.secondSauce);

    cy.get('[data-cy="order-button"]').click({ force: true });
    cy.wait('@createOrder');

    cy.get('[data-cy="order-number"]').should('contain', '83688');
    cy.get('[data-cy="modal-close"]').find('svg').click({ force: true });

    expectConstructorToContain.bun('Выберите булки');
    expectConstructorToContain.ingredient('Выберите начинку');
    expectConstructorToContain.price(0);
  });

  it('редирект при неавторизованном заказе', () => {
    cy.addIngredient(INGREDIENTS.bun);
    cy.addIngredient(INGREDIENTS.veg);
    cy.get('[data-cy="order-button"]').click({ force: true });
    cy.url().should('include', '/login');
  });
});
