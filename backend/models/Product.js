const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  userid: {
    required: true,
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  title: String,
  price: Number,
  image: String,
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
