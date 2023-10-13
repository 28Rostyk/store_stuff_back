const express = require("express");
const productsRouter = express.Router();

const { getProducts, addProducts } = require("../../controller");

productsRouter.get("/", getProducts);
productsRouter.post("/", addProducts);

module.exports = { productsRouter };
