class CheckoutPage {
  constructor(page, expect) {
    this.page = page;
    this.expect = expect;
    this.cvv = page.locator(".input.txt");
    this.coupon = page.locator(".input.txt");
    this.applyCoupon = page.locator('[type="submit"]');
    this.couponApplied = page.locator(".mt-1.ng-star-inserted");
    this.countryPicker = page.locator('[placeholder="Select Country"]');
    this.dropdown = page.locator(".ta-results");
    this.countryElement = this.dropdown.locator("button");
    this.emailField = page.locator(".user__name.mt-5 label");
    this.placeOrderButton = page.locator(".btnn.action__submit.ng-star-inserted");
  }

  async enterCoupon(couponName) {
    await this.coupon.nth(3).fill(couponName);
    await this.applyCoupon.click();
  }

  async enterCVV(cvv) {
    await this.cvv.nth(1).fill(cvv);
  }

  async assertAppliedCoupon() {
    const a = this.couponApplied;
    await this.expect(a).toContainText("Coupon Applied");
  }

  async choseCountry(countryName, countryExpected) {
    await this.countryPicker.type(countryName, { delay: 100 });
    await this.dropdown.waitFor();
    const countryCount = await this.countryElement.count();
    for (let i = 0; i < countryCount; ++i) {
      let text = await this.countryElement.nth(i).textContent();
      if (text.trim() === countryExpected) {
        await this.countryElement.nth(i).click();
        break;
      }
    }
  }

  async assertIsEmailsMatch(email) {
    await this.expect(this.emailField).toHaveText(email);
  }

  async placeOrderButtonClick() {
    await this.placeOrderButton.click();
  }
}
export default CheckoutPage;
