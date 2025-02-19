var express = require("express");
var orderRouter = express.Router();

orderRouter.get("/getOrder", (req, res) => {
  res.json({ Message: "Everything is fine!!" });
});

module.exports = { orderRouter };
