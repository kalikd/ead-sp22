const Product = require("../models/Product");
const path = require("path");

const getProducts = async (req, res) => {
  console.log(req.session.uid);
  const products = await Product.find().populate("userid");
  res.render("products", { products });
};



const getAllProducts = async (req, res) => {
  const products = await Product.find()
  res.json(products)
};


const create = (req, res) => {
  res.render("create");
};

const productDetail = async (req, res) => {
  const pid = req.params.pid;
  console.log("PID:", pid);
  const prod = await Product.findById(pid);
  res.render("productDetail", { product: prod });
};

const createProduct = (req, res) => {
  console.log("create");
  console.log(req.body);
  const img = req.files.pic;
  img.mv(path.resolve(__dirname, "public/img", img.name), (err) => {
    Product.create(
      { ...req.body, image: img.name, userid: req.session.uid },
      (err, product) => {
        console.log(product);
        res.redirect("/products");
      }
    );
  });
};

module.exports = { getProducts, create, productDetail, createProduct, getAllProducts };
