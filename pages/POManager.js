import DashboardPage from "./DashboardPage"
import LoginPage from "./LoginPage"
import CartPage from "./CartPage"
import CheckoutPage from "./CheckoutPage"
import SuccessPage from "./SuccessPage"
import OrdersPage from "./OrdersPage"

class POManager{
    constructor(page, expect){
        this.page = page
        this.expect = expect
        this.loginPage = new LoginPage(this.page)
        this.dashboardPage = new DashboardPage(this.page)
        this.cartPage = new CartPage(this.page, this.expect)
        this.checkoutPage = new CheckoutPage(this.page, this.expect)
        this.successPage = new SuccessPage(this.page, this.expect)
        this.ordersPage = new OrdersPage(this.page, this.expect)
    }

    getLoginPage(){
        return this.loginPage
    }

    getDashboardPage(){
        return this.dashboardPage
    }

    getCartPage(){
        return this.cartPage
    }

    getCheckoutPage(){
        return this.checkoutPage
    }

    getSuccessPage(){
        return this.successPage
    }
    
    getOrdersPage(){
        return this.ordersPage
    }
}
export default POManager 