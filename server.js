var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cors = require("cors");
var multer = require("multer");
var morgan = require("morgan");
var path = require("path");
const dotenv = require("dotenv");
const { userRouter } = require("./Routers/user.router");
const { orderRouter } = require("./Routers/order.router");
const { checkAge } = require("./Middlewares/custom.middleware");
const { dbConfig } = require("./Configuration/db.config");

dotenv.config();

// in build middlewares
app.use(express.json());
app.use(morgan("short"));
app.use(express.urlencoded({ extended: true }));
app.use(multer().array());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "abc"));

app.use("/api/user", userRouter);
app.use("/api/order", checkAge, orderRouter);

app.listen(process.env.PORT, () => {
  dbConfig();
  console.log(`Listening to Port ${process.env.PORT}`);
});
