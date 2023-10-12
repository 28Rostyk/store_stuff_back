const { ctrlWrapper } = require("../../helpers");

const { Category } = require("../../models");

const addCategories = async (req, res) => {
  const result = await Category.create({ ...req.body });
  res.status(201).json(result);
};

module.exports = {
  addCategories: ctrlWrapper(addCategories),
};
