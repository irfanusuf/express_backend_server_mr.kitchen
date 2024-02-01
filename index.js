const express = require("express");
const {
  registerController,
  loginController,

} = require("./controllers/userController");



const {orderHandler , cancelOrderHandler} = require("./controllers/orderController");
const authHandler = require("./middleware/auth");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyparser = require("body-parser");
const dotenv = require("dotenv")



const app = express();

dotenv.config()
app.use(bodyparser.json());
app.use(cors());

const Port = 4000;
const url = "mongodb://localhost:27017/mr_kitchen";

if (mongoose.connect(url)) {
  console.log(`Database Connected on ${url}`);
} else {
  console.log("Database Eror ");
}

// route middle ware
app.get("/", (req, res) => {
  res.json({ message: "hello world " });
});



//user routes
app.post("/user/register", registerController);
app.post("/user/login", loginController);

//user/order routes
app.post("/user/order/new", authHandler, orderHandler);
app.post("/user/order/cancel", authHandler, cancelOrderHandler);

// server start
app.listen(Port, () => {
  console.log(`server started on port ${Port}`);
});
