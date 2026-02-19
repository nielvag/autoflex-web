describe("Cadastro de Produto", () => {
  before(() => {
    cy.resetTestDb();
  });

  it("deve criar um novo produto com sucesso", () => {
    cy.visit("http://localhost:5173");
    cy.get('[data-testid="new-product-btn"]').click();
    cy.get('[data-testid="product-code-input"]').type("123");
    cy.get('[data-testid="product-name-input"]').type("Garrafa PET 1L");
    cy.get('[data-testid="product-price-input"]').type("12,50");
    cy.get('[data-testid="send-product-button"]').click();
    cy.get('[data-testid="product-code"]').should("have.text", "123");
    cy.get('[data-testid="product-name"]').should(
      "have.text",
      "Garrafa PET 1L",
    );
    cy.get('[data-testid="product-price"]').should("have.text", "12,50");
  });

  it("não deve permitir criar produto sem código", () => {
    cy.visit("/");

    cy.get('[data-testid="new-product-btn"]').click();

    cy.get('[data-testid="product-name-input"]').type("Produto Teste");
    cy.get('[data-testid="product-price-input"]').type("10,00");

    cy.get('[data-testid="send-product-button"]').click();

    cy.url().should("eq", "http://localhost:5173/new-product");
  });

  it("deve poder cancelar criação saindo da página", () => {
    cy.visit("/");
    cy.get('[data-testid="new-product-btn"]').click();
    cy.get('[data-testid="product-name-input"]').type("Produto Teste");
    cy.get('[data-testid="products-menu-item-desktop"]').click();
    cy.url().should("eq", "http://localhost:5173/products");
  });
});
