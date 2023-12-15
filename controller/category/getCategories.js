const { Category } = require("../../models");
const { ctrlWrapper } = require("../../helpers");

const getCategories = async (req, res) => {
  const {
    page = 1,
    perPage = 10,
    sortBy = "createdAt",
    sortOrder = "asc",
  } = req.query;

  // try {
  //   const category = await Category.find({}, "-createdAt -updatedAt");
  //   res.json(category);
  // } catch (error) {
  //   console.log("Error fetching categories:", error);
  //   res.status(500).json({ message: "Error fetching categories" });
  // }

  try {
    const skip = (page - 1) * perPage;

    const totalCount = await Category.countDocuments();
    const totalPages = Math.ceil(totalCount / perPage);

    const sortField = sortBy === "price" ? "price" : "createdAt";
    const sortDirection = sortOrder === "desc" ? -1 : 1;
    const sortOptions = { [sortField]: sortDirection };

    const categories = await Category.find({}, "-createdAt -updatedAt")
      .sort(sortOptions)
      .skip(skip)
      .limit(perPage);

    res.json({
      totalPage: totalPages,
      totalItems: totalCount,
      perPage: perPage,
      currentPage: page,
      categories: categories,
    });
  } catch (error) {
    console.log("Error fetching categories:", error);
    res.status(500).json({ message: "Error fetching categories" });
  }
};

module.exports = {
  getCategories: ctrlWrapper(getCategories),
};
