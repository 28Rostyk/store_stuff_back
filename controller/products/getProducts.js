const { Products } = require("../../models");
const { ctrlWrapper } = require("../../helpers");

const getProducts = async (req, res) => {
  try {
    const category = await Products.find({}, "-createdAt -updatedAt");
    res.json(category);
  } catch (error) {
    console.log("Error fetching categories:", error);
    res.status(500).json({ message: "Error fetching categories" });
  }
};

module.exports = {
  getProducts: ctrlWrapper(getProducts),
};
