var jwt = require("jsonwebtoken");
function checkAge(req, res, next) {
  if (req.query.age >= 18) {
    let user = { name: "Gaurav", course: "FSD", age: 23 };
    req.user = user;
    next();
  } else {
    res.json({ Message: "You are not eligible" }).status(201);
  }
}
const isLoggedIn = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    res.status(401).json({ Message: "Unauthorized to do it" });
    return;
  }
  const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
  if (!decoded) {
    res.status(401).json({ Message: "Unauthorized to do it" });
    return;
  }
  req.user = decoded;
  next();
};

function authorizeRole(...roles) {
  return function (req, res, next) {
    if (!roles.includes(req.user.role)) {
      res.json({ Message: "User is denied" });
    } else {
      next();
    }
  };
}

module.exports = { checkAge, isLoggedIn, authorizeRole };
