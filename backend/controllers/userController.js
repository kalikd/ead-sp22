const User = require("../models/User");
const bcrypt = require("bcrypt");

const login = (req, res) => {
  res.render("user/login");
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect("/login");
};

const authenticate = (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username }, (err, user) => {
    console.log(user);
    if (user) {
      bcrypt.compare(password, user.password, (err, validated) => {
        console.log(validated);
        if (validated) {
          req.session.uid = user._id;
          isLoggedIn = true;
          res.redirect("/");
        } else {
          res.redirect("/login");
        }
      });
    } else {
      res.redirect("/login");
    }
  });
};

const create = (req, res) => {
  const data = req.flash("data")[0];
  console.log("KDD=>", data);
  let username = "";

  if (data) {
    username = data.username;
  }

  res.render("user/create", {
    errors: req.flash("validationErrors"),
    username,
  });
};

const signup = (req, res) => {
  console.log(req.body);
  User.create(req.body, (err, user) => {
    if (err) {
      req.flash("data", req.body);
      console.log("XError=>", err);
      const errors = Object.keys(err.errors).map(
        (itm) => err.errors[itm].message
      );
      req.flash("validationErrors", errors);
      return res.redirect("/signup");
    }
    console.log(user);
    res.redirect("/");
  });
};
module.exports = { create, signup, login, authenticate, logout };

// err = {errors:{
//   username:{msg:'ss'},
//   pass:{msg:'sss'}
// }}
