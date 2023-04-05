class OrdersPage {
  constructor(page, expect) {
    this.page = page;
    this.expect = expect;
    this.table = page.locator("tbody");
    this.rows = page.locator("tbody tr");
    this.myOrderButton = page.locator("table tbody button.btn-primary");
  }

  async assertOrderPresentInTheOrderPage(outputString) {
    await this.table.waitFor();
    const tableCount = await this.rows.count();
    for (let i = 0; i < tableCount; ++i) {
      const rowOrderId = await this.rows.nth(i).locator("th").textContent();
      if (outputString.includes(rowOrderId)) {
        await this.myOrderButton.nth(i).click();
        break;
      }
    }
  }
}
export default OrdersPage;
