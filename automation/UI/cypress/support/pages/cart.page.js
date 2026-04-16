class CartPage {
  visit() {
    cy.visit("carrinho");
  }

  cartTable() {
    return cy.get(".shop_table.cart, table.shop_table");
  }

  notices() {
    return cy.get(".woocommerce-message, .woocommerce-error, .woocommerce-info");
  }

  couponInput() {
    return cy.get("#coupon_code");
  }

  fillCoupon(code) {
    this.couponInput().clear().type(code);
  }

  applyCoupon() {
    cy.contains("button", "Aplicar cupom").click({ force: true });
  }

  totalAmount() {
    return cy.get(".order-total .woocommerce-Price-amount, .cart-subtotal .woocommerce-Price-amount");
  }

  proceedToCheckoutButton() {
    return cy.get(".checkout-button, .wc-proceed-to-checkout a");
  }

  goToCheckout() {
    this.proceedToCheckoutButton().should("be.visible").click();
  }
}

export const cartPage = new CartPage();
