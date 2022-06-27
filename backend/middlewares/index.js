const User = require("../models/User");
const jwt = require('jsonwebtoken');
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

// const verifyToken = (req, res, next) => {
//   const headerToken = req.headers.authorization.split(" ")[1];
//   const res = jwt.verify(headerToken,process.env.SECRET_KEY)
//   if(!res) {
//     return res.status(403).json({msg:'Error'})
//   }
//   next()
// }

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

const hasToken = (req, res, next) => {
  try {
    const headerValue = req.headers.authorization.split(' ')[1]
    console.log('Token:', headerValue);
    const result = jwt.verify(headerValue, process.env.SECRET_KEY)
    if(result) {
      next()
    }
    else
    return res.status(401).send({msg:'Unauthorized'})
  }
  catch (err) {
    return res.status(401).send({msg:err})
  }
}

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
  hasToken
  //verifyToken
};
