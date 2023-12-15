const { Products } = require("../../models");
const { ctrlWrapper } = require("../../helpers");

const getAllProducts = async (req, res) => {
  try {
    const products = await Products.find({}, "-createdAt -updatedAt");

    res.json({
      products: products,
    });
  } catch (error) {
    console.log("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products" });
  }
};

module.exports = {
  getAllProducts: ctrlWrapper(getAllProducts),
};
