const router = require("express").Router();
const Sale = require("../models/salesModel");

// Save sale
router.post("/", async (req, res) => {
  const sale = new Sale(req.body);
  await sale.save();
  res.json(sale);
});

// Get sales
router.get("/", async (req, res) => {
  const sales = await Sale.find();
  res.json(sales);
});

module.exports = router;