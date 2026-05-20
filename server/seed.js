const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/productModel');

dotenv.config();

const products = [
  { name: "Kopiko Brown", price: 10, stock: 35 },
  { name: "Lucky Me Pancit", price: 12, stock: 12 },
  { name: "Coca-Cola 1.5L", price: 60, stock: 5 },
  { name: "Skyflakes Crackers", price: 8, stock: 48 },
  { name: "Tang Orange Juice", price: 15, stock: 22 },
  { name: "Rebisco Sandwich", price: 6, stock: 60 },
  { name: "Milo Energy Drink", price: 25, stock: 18 },
  { name: "Piattos Cheese", price: 18, stock: 30 }
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log('✅ Products seeded!');
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});