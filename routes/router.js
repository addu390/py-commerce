const express = require("express");
const {
  getProducts,
  getProductById,
  addProduct,
  getProductsByCategory,
} = require("../controllers/product-controller");
const {
  addItem,
  removeItem,
  removeAllItem,
  getCartItems,
} = require("../controllers/cart-controller");

const {
  addItem: addItemFavorites,
  removeItem: removeItemFavorites,
  getFavoritesItems,
} = require("../controllers/favorites-controller");

const {
  signup,
  login,
  logout,
  loginWithMobileNumber,
  isExistPhone,
  authentication,
  updateUserInfo,
  updateEmail,
} = require("../controllers/user-controller");

const {
  addNewAddress,
  getAddress,
  deleteAddress,
} = require("../controllers/address-controller");

const {
  completeOrder,
  getOrderDetails,
} = require("../controllers/order-controller");

const router = express.Router();

router.post("/accounts/signup", signup);
router.post("/accounts/login", login);
router.post("/accounts/login-with-phone", loginWithMobileNumber);
router.post("/accounts/check-phone", isExistPhone);
router.get("/accounts/authentication", authentication);
router.get("/accounts/logout", logout);
router.patch("/accounts/update-user-info", updateUserInfo);
router.patch("/accounts/update-email", updateEmail);

router.get("/products/get-products", getProducts);
router.get("/products/get-products/:categoryName", getProductsByCategory);
router.get("/products/get-product/:id", getProductById);
router.post("/products/add-product", addProduct);

router.post("/cart/add-item", addItem);
router.delete("/cart/remove-item", removeItem);
router.delete("/cart/clear-cart", removeAllItem);
router.get("/cart/get-items/:id", getCartItems);

router.post("/favorites/add-item", addItemFavorites);
router.delete("/favorites/remove-item", removeItemFavorites);
router.get("/favorites/get-items/:id", getFavoritesItems);

router.post("/address/add-address", addNewAddress);
router.get("/address/get-addresses/:id", getAddress);
router.delete("/address/delete-address", deleteAddress);

router.post("/orders/complete-order", completeOrder);
router.post("/orders/get-order-details", getOrderDetails);

module.exports = router;
