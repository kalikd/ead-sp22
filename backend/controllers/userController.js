const User = require("../models/User");

const login = (req, res) => {
  res.render("user/login");
};

const create = (req, res) => {
  res.render("user/create");
};

User.findByIdAndRemove
User.findByIdAndDelete

const signup = (req, res) => {
  console.log(req.body);
  User.create(req.body, (err, user) => {
    if (err) {
      return res.redirect("/signup");
    }
    console.log(user);
    res.redirect("/");
  });
};
module.exports = { create, signup, login };
