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
  refreshToken,
  googleAuth,
} = require("./user");

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
  refreshToken,
  googleAuth,
};
