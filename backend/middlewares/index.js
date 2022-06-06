const User = require("../models/User");
const validateMiddleware = (req, res, next) => {
  const { title, price } = req.body;
  if (!title || !price || !req.files) {
    return res.redirect("/create");
  }
  next();
};

const myMiddleware = (req, res, next) => {
  console.log("another middleware");

  next();
};

const setLoggedInUser = (req, res, next) => {
  global.isLoggedIn = req.session.uid;
  next();
};

const isAuthenticated = (req, res, next) => {
  User.findById(req.session.uid, (err, user) => {
    if (!user) {
      return res.redirect("/login");
    }
    next();
  });
};

const isLoggedIn = (req, res, next) => {
  User.findById(req.session.uid, (err, user) => {
    if (user) {
      return res.redirect("/");
    }
    next();
  });
};

module.exports = {
  validateMiddleware,
  myMiddleware,
  isAuthenticated,
  isLoggedIn,
  setLoggedInUser,
};
