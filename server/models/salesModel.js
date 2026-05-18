const mongoose = require("mongoose");

const SalesSchema = new mongoose.Schema({
  items: Array,
  total: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Sale", SalesSchema);