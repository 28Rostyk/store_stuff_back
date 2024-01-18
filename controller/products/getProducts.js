// const { Products } = require("../../models");
// const { ctrlWrapper } = require("../../helpers");

// const getProducts = async (req, res) => {
//   const {
//     categoryId = "",
//     search = "",
//     page = 1,
//     perPage = 10,
//     sortBy = "createdAt",
//     sortOrder = "desc",
//   } = req.query;

//   const query = {};

//   try {
//     const skip = (page - 1) * perPage;
//     const sortField = sortBy === "price" ? "price" : "createdAt";
//     const sortDirection = sortOrder === "desc" ? -1 : 1;
//     const sortOptions = { [sortField]: sortDirection };

//     const searchTerms = search.split(" ").map((term) => new RegExp(term, "i"));
//     if (searchTerms && categoryId) {
//       query.$and = [
//         { title: { $regex: search, $options: "i" } },
//         { "category.id": categoryId },
//       ];
//     } else if (search) {
//       query.title = { $regex: search, $options: "i" };
//     } else if (categoryId) {
//       query["category.id"] = categoryId;
//     }

//     const totalCount = await Products.countDocuments(query);
//     const totalPages = Math.ceil(totalCount / perPage);

//     const filteredData = await Products.find(query, "-createdAt -updatedAt")
//       .skip(skip)
//       .sort(sortOptions)
//       .limit(perPage);

//     res.json({
//       totalPage: totalPages,
//       totalItems: totalCount,
//       perPage: perPage,
//       currentPage: page,
//       products: filteredData,
//     });
//   } catch (error) {
//     console.log("Error fetching products:", error);
//     res.status(500).json({ message: "Error fetching products" });
//   }
// };

// module.exports = {
//   getProducts: ctrlWrapper(getProducts),
// };
const { Products } = require("../../models");
const { ctrlWrapper } = require("../../helpers");

const getProducts = async (req, res) => {
  const {
    categoryId = "",
    search = "",
    page = 1,
    perPage = 10,
    sortBy = "createdAt",
    sortOrder = "desc",
    price_min = 0,
    price_max = 0,
  } = req.query;

  const query = {};

  try {
    const skip = (page - 1) * perPage;
    const sortField = sortBy === "price" ? "price" : "createdAt";
    const sortDirection = sortOrder === "desc" ? -1 : 1;
    const sortOptions = { [sortField]: sortDirection };

    const searchTerms = search.split(" ").map((term) => new RegExp(term, "i"));

    if (searchTerms && categoryId) {
      query.$and = [
        { title: { $regex: search, $options: "i" } },
        { "category.id": categoryId },
      ];
    } else if (search) {
      query.title = { $regex: search, $options: "i" };
    } else if (categoryId) {
      query["category.id"] = categoryId;
    }

    // Додайте умову для діапазону цін
    if (price_min && price_max) {
      query.price = { $gte: parseInt(price_min), $lte: parseInt(price_max) };
    } else if (price_min) {
      query.price = { $gte: parseInt(price_min) };
    } else if (price_max) {
      query.price = { $lte: parseInt(price_max) };
    }

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
