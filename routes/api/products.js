const express = require("express");
const productsRouter = express.Router();

const {
  getProducts,
  addProducts,
  getAllProducts,
  getProductById,
} = require("../../controller");

productsRouter.get("/", getProducts);
productsRouter.get("/all-products", getAllProducts);
productsRouter.get("/:id", getProductById);
productsRouter.post("/", addProducts);

module.exports = { productsRouter };
