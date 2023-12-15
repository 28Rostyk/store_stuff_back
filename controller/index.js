const { getCategories, addCategories } = require("./category");
const {
  getProducts,
  addProducts,
  getAllProducts,
  getProductById,
} = require("./products");

const {
  login,
  register,
  getCurrent,
  logout,
} = require("./user/authController");

module.exports = {
  getCategories,
  addCategories,
  getProducts,
  addProducts,
  getAllProducts,
  getProductById,
  login,
  register,
  getCurrent,
  logout,
};
