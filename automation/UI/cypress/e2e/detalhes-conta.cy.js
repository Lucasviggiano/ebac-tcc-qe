import { loginActions } from "../support/actions/login.actions";

describe("US003 - Detalhes da conta", () => {
  let users;

  before(() => {
    cy.fixture("users").then((data) => {
      users = data;
    });
  });

  it("CT-US003-01 - deve atualizar detalhes da conta com sucesso", () => {
    const timestamp = Date.now();
    const firstName = `Lucas${timestamp}`;
    const lastName = "QA";
    const displayName = `lucas.qa.${timestamp}`;

    loginActions.loginWithCredentials(users.validUser.username, users.validUser.password);

    cy.visit("/minha-conta/edit-account/");
    cy.get("#account_first_name").should("be.visible").clear().type(firstName);
    cy.get("#account_last_name").should("be.visible").clear().type(lastName);
    cy.get("#account_display_name").should("be.visible").clear().type(displayName);
    cy.get(".woocommerce-Button").click();

    cy.get(".woocommerce-message").should("contain.text", "Detalhes da conta modificados com sucesso");
  });
});
