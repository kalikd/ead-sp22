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

const expressSession = require("express-session");

const fileUpload = require("express-fileupload");

const mongoose = require("mongoose");

const path = require("path");

const flash = require("connect-flash");

const dotenv = require("dotenv");

const EventEmitter = require("events");

const event = new EventEmitter();

event.on("bark", function (name, age) {
  console.log(name + " is barking! He is" + age + "old. bow bow bow");
});

event.emit("bark", "Sheroo", 21);
event.emit("bark", "Tommy", 12);
event.emit("bark", "Wadera", 5);

dotenv.config();

const middleware = require("./middlewares/");

const productController = require("./controllers/productController");

const userController = require("./controllers/userController");

const { render, compileFile } = require("pug");

const app = express();

app.use(fileUpload());

app.use(flash());

app.use(expressSession({ secret: "MYSECRETKEY" }));

app.use("/style", express.static("public/css"));
app.use("/images", express.static("public/img"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

mongoose.connect("mongodb://127.0.0.1:27017/ead2");

//app.use("/product/create", validateMiddleware);

global.isLoggedIn = null;

app.use("*", middleware.setLoggedInUser);

app.get("/", function (req, res) {
  //const homePage = path.resolve(__dirname, 'index.html')
  //console.log(__dirname)
  //res.sendFile(homePage)

  const products = ["A", "B", "C", "D", "E", "F", "G", "H", "Apple"];
  res.render("index", { name: "Kamal", products });
});

app.get("/product/create/name", (req, res) => {
  console.log("name");
  res.send({ msg: "Wow" });
});

app.post(
  "/product/create",
  middleware.myMiddleware,
  middleware.validateMiddleware,

  productController.createProduct
);

app.get("/logout", userController.logout);

app.get("/signup", middleware.isLoggedIn, userController.create);

app.get("/login", middleware.isLoggedIn, userController.login);

app.post("/user/validate", userController.authenticate);

app.post("/user/create", userController.signup);


app.get(
  "/product/getProduct/:pid",
  middleware.isAuthenticated,
  productController.productDetail
);

app.get("/create", middleware.isAuthenticated, productController.create);

app.get("/products", middleware.isAuthenticated, productController.getProducts);

app.get("/getProducts", productController.getAllProducts);

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



module.exports = app;
