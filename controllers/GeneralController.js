const Category = require("../models/Category");
const Product = require("../models/Product");

async function getCategoriesWithProducts(req, res) {
  try {
    const categories = await Category.find().populate("products");
    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

async function getProductsByCategory(req, res) {
  const { id } = req.params;

  try {
    const products = await Product.find({ categories: id }).populate("categories");
    if (!products || products.length === 0) {
      return res.status(404).json({ msg: "Nenhum produto encontrado para essa categoria!" });
    }
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

module.exports = {
  getCategoriesWithProducts,
  getProductsByCategory,
};
