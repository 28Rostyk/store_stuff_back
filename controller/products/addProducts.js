const { ctrlWrapper } = require("../../helpers");

const { Products } = require("../../models");

const addProducts = async (req, res) => {
  const result = await Products.create({ ...req.body });
  res.status(201).json(result);
};

module.exports = {
  addProducts: ctrlWrapper(addProducts),
};
