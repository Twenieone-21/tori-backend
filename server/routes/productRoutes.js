const express = require("express");
const router = express.Router();
const {
  getProducts,
  addProduct,
  updateStock,
  deleteProduct
} = require("../controllers/productController");

router.get("/", getProducts);
router.post("/", addProduct);
router.put("/:id", updateStock);
router.delete("/:id", deleteProduct);

module.exports = router;