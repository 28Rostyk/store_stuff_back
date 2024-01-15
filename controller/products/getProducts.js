const { Products } = require("../../models");
const { ctrlWrapper } = require("../../helpers");

const getProducts = async (req, res) => {
  const {
    search = "",
    page = 1,
    perPage = 10,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = req.query;

  try {
    const skip = (page - 1) * perPage;
    const sortField = sortBy === "price" ? "price" : "createdAt";
    const sortDirection = sortOrder === "desc" ? -1 : 1;
    const sortOptions = { [sortField]: sortDirection };

    const searchTerms = search.split(" ").map((term) => new RegExp(term, "i"));
    const query = search ? { title: { $all: searchTerms } } : {};

    const totalCount = await Products.countDocuments(query);
    const totalPages = Math.ceil(totalCount / perPage);

    const filteredData = await Products.find(query, "-createdAt -updatedAt")
      .skip(skip)
      .sort(sortOptions)
      .limit(perPage);

    res.json({
      totalPage: totalPages,
      totalItems: totalCount,
      perPage: perPage,
      currentPage: page,
      products: filteredData,
    });
  } catch (error) {
    console.log("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products" });
  }
};

module.exports = {
  getProducts: ctrlWrapper(getProducts),
};
