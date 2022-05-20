const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  title: String,
  price: Number,
  image: String,
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
