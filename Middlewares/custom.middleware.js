function checkAge(req, res, next) {
  if (req.query.age >= 18) {
    let user = { name: "Gaurav", course: "FSD", age: 23 };
    req.user = user;
    next();
  } else {
    res.json({ Message: "You are not eligible" }).status(201);
  }
}
module.exports = { checkAge };
