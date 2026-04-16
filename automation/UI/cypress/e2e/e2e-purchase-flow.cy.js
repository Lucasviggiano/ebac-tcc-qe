import { loginActions } from "../support/actions/login.actions";
import { cartActions } from "../support/actions/cart.actions";
import { checkoutActions } from "../support/actions/checkout.actions";
import { checkoutPage } from "../support/pages/checkout.page";
import { loginPage } from "../support/pages/login.page";

describe("E2E - Fluxo de compra", () => {
  let users;
  let products;
  let checkoutData;

  before(() => {
    cy.fixture("users").then((data) => {
      users = data;
    });
    cy.fixture("products").then((data) => {
      products = data;
    });
    cy.fixture("checkout").then((data) => {
      checkoutData = data;
    });
  });

  it("deve autenticar, adicionar item e avancar para checkout", () => {
    loginActions.loginWithCredentials(users.validUser.username, users.validUser.password);
    loginPage.accountPanel().should("be.visible");

    cartActions.addProductFromStore(products.sportsBra);
    cartActions.goToCart();
    cartActions.goToCheckout();

    checkoutPage.billingFirstName().should("be.visible");
    checkoutActions.fillBillingData(checkoutData.billingData);
    checkoutPage.placeOrderButton().should("be.visible");
  });
});
