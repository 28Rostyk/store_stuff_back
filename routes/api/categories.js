const express = require("express");
const categoriesRouter = express.Router();

const { getCategories, addCategories } = require("../../controller");

categoriesRouter.get("/", getCategories);
categoriesRouter.post("/", addCategories);

module.exports = { categoriesRouter };
