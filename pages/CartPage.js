class CartPage {
  constructor(page, expect) {
    this.expect = expect;
    this.cartItem = page.locator("div li");
    this.itemName = page.locator('h3:has-text("adidas")');
    this.checkoutButton = page.locator('.btn.btn-primary:has-text("Checkout")');
  }

  async waitLoadingCartPage() {
    await this.cartItem.first().waitFor();
  }

  assertAddedProductInTheCartPage() {
    const isProductVisible = this.itemName.isVisible();
    this.expect(isProductVisible).toBeTruthy();
  }

  async checkoutButtonClick() {
    await this.checkoutButton.click();
  }
}
export default CartPage;
