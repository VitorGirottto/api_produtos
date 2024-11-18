const express = require("express");
const router = express.Router();
const GeneralController = require("../controllers/GeneralController");

router.get("/categories/products", GeneralController.getCategoriesWithProducts);

router.get("/categories/:id/products", GeneralController.getProductsByCategory);

module.exports = router;
