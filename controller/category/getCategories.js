const { Category } = require("../../models");
const { ctrlWrapper } = require("../../helpers");

const getCategories = async (req, res) => {
  try {
    const category = await Category.find({}, "-createdAt -updatedAt");
    res.json({
      category: category,
    });
  } catch (error) {
    console.log("Error fetching categories:", error);
    res.status(500).json({ message: "Error fetching categories" });
  }
};

module.exports = {
  getCategories: ctrlWrapper(getCategories),
};
