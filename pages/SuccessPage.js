class SuccessPage {
  constructor(page, expect) {
    this.page = page;
    this.expect = expect;
    this.congratsMessage = page.locator(".hero-primary");
    this.order = page.locator("label.ng-star-inserted");
    this.ordersLink = page.locator('label[routerlink="/dashboard/myorders"]');
    this.result = page.locator(".col-text");
  }

  async assertCongratsMessage(text) {
    await this.expect(this.congratsMessage).toHaveText(text);
  }

  async getOrderNumber() {
    const orderNumberText = await this.order.textContent();
    const outputString = orderNumberText.trim().replace(/\|/g, "");
    return outputString;
  }

  async ordersLinkClick() {
    await this.ordersLink.click();
  }

  async assertCheckOrderNumber(orderNumberText) {
    const result = await this.result.textContent();
    this.expect(orderNumberText.includes(result)).toBeTruthy();
  }
}
export default SuccessPage;
