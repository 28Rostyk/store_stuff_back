const { categoriesRouter } = require("./categories");
const { productsRouter } = require("./products");
const authRouter = require("./auth");

module.exports = {
  categoriesRouter,
  productsRouter,
  authRouter,
};
