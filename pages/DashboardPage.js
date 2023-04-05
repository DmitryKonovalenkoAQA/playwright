class DashboardPage{
    constructor(page){
        this.products = page.locator(".card-body")
        this.productsText =  page.locator(".card-body b")
        this.cart = page.locator("[routerLink*='cart']")
    }

    async searchProduct(productName){
      //Save all orders to titles 
      const titles = await this.productsText.allTextContents();
 
      //Counting orders
      const count = await this.products.count();
 
      for (let i = 0; i < count; ++i) {
        if ((await this.products.nth(i).locator("b").textContent()) === productName) {
          await this.products.nth(i).locator("text= add To cart").click();
          break;
        }
      }
    }

    async navigateToCart(){
        await this.cart.click();
    }
}

export default DashboardPage