class ApiUtils {
  constructor(apiContext, loginPayload, page) {
    this.apiContext = apiContext;
    this.loginPayload = loginPayload;
    this.page = page
  }

  async getToken() {
    const loginResponse = await this.apiContext.post(
      "https://www.rahulshettyacademy.com/api/ecom/auth/login",
      { data: this.loginPayload }
    );
    const loginResponseJson = await loginResponse.json();
    const loginToken = loginResponseJson.token;
    console.log(loginToken);
    return loginToken;
  }

  async createOrder(orderPayload) {
    let response = {};
    response.token = await this.getToken();
    const orderResponse = await this.apiContext.post(
      "https://www.rahulshettyacademy.com/api/ecom/order/create-order",
      { data: orderPayload, headers: { Authorization: response.token } }
    );
    const orderResponseJson = await orderResponse.json();
    const orderNumber = orderResponseJson.orders[0];
    response.orderId = orderNumber;
    return response;
  }
}

// export const apiUtils = new ApiUtils()
export default { ApiUtils };
// export default ApiUtils
