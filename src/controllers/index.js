const { userRegister, userOrders, userCart, addProductToCart, purchaseCart } = require("./users.controllers");
const { userLogin } = require("./auth.controllers");
const { createProduct, getAllProducts } = require("./products.controllers");

module.exports = { userRegister, 
    userLogin, 
    createProduct, 
    getAllProducts, 
    userOrders, 
    userCart, 
    addProductToCart,
    purchaseCart };