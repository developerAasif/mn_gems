


var base_url = "https://codingfunz.co.in/mn-jewellers/api";

export default {
    getHomeData : base_url + "/customer/home-data",
    getViewAllProducts : base_url + "/product/get_products",
    getViewAllPopularProducts : base_url + "/product/get_popular_products",
    getProductDetail : base_url + "/product/get_product/",
    addToCart : base_url + "/customer/add-to-cart",
    getCartItems : base_url + "/customer/get-cart/",
    deleteCartItems : base_url + "/customer/delete-cart/",
    updateCartItems : base_url + "/customer/update-cart",
    addressAdd : base_url + "/customer/add-address",
    placeOrder : base_url + "/customer/place_order",

    register : base_url + "/customer/login",
}