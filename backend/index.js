// const http = require('http')

// const fs = require('fs')

// const server = http.createServer(function(req, res) {
//     if(req.url == '/'){
//         const homePage = fs.readFileSync('index.html')
//         res.end(homePage)
//         //res.write('Homepage')
//     }

//     else if(req.url == '/about'){
//         const aboutPage = fs.readFileSync('about.html')
//         res.end(aboutPage)
//         //res.write('Homepage')
//     }
// })

// server.listen(3000, function() {
//     console.log('listening on port 3000')
// })

const express = require("express");

const bodyParser = require("body-parser");

const fileUpload = require("express-fileupload");

const mongoose = require("mongoose");

const path = require("path");

const productController = require("./controllers/productController");

const { render, compileFile } = require("pug");

const app = express();

app.use(fileUpload());

app.use("/style", express.static("public/css"));
app.use("/images", express.static("public/img"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

mongoose.connect("mongodb://127.0.0.1:27017/ead2");

const validateMiddleware = (req, res, next) => {
  const { title, price } = req.body;
  if (!title || !price || !req.files) {
    return res.redirect("/create");
  }
  next();
};

app.use("/product/create", validateMiddleware);

app.get("/", function (req, res) {
  //const homePage = path.resolve(__dirname, 'index.html')
  //console.log(__dirname)
  //res.sendFile(homePage)

  const products = ["A", "B", "C", "D", "E", "F", "G", "H", "Apple"];
  res.render("index", { name: "Kamal", products });
});

app.post("/product/create", productController.createProduct);

app.get("/product/getProduct/:pid", productController.productDetail);

app.get("/create", productController.create);

app.get("/products", productController.getProducts);

app.all("/about", function (req, res) {
  // const aboutPage = path.resolve(__dirname, 'about.html')
  // console.log(__dirname)
  // res.sendFile(aboutPage)
  // res.json({data:'about',msg:'Success'})
  res.render("about");
});

app.all("/blog", function (req, res) {
  const func = compileFile("views/heading.pug");
  console.log(func({ name: "Aariz Ali" }));
  console.log(func({ name: "Asad Ali" }));
  const products = ["A", "B", "C", "D", "E", "F", "G", "H", "Apple"];
  res.render("blog", { name: "KD", products });
});

// app.use('/about', function(req, res) {

// })

app.use("*", function (req, res) {
  res.status(404).json({ msg: "Not Found" });
});

app.listen(3000, function () {
  console.log("listening at port 3000");
});
