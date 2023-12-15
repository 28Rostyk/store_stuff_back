const { ctrlWrapper } = require("../../helpers");
const { Products } = require("../../models");

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Products.findOne({ id });

    if (!result) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getProductById: ctrlWrapper(getProductById),
};
