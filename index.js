const express = require("express");
const {
  registerController,
  loginController,
  logoutController,
  deleteUserController,
  forgotPassController,
  updatePassWordController,
  changePassWordController
} = require("./controllers/userController");

const multerMid = require("./middleware/multer");
const {
  orderHandler,
  cancelOrderHandler,
} = require("./controllers/orderController");


const isAuthenticated = require("./middleware/auth");



const mongoose = require("mongoose");
const cors = require("cors");              //importing cors 
const bodyparser = require("body-parser");
const cookieparser =require ("cookie-parser")
const dotenv = require("dotenv");

const app = express();

dotenv.config();
app.use(bodyparser.json());                 //  parses json data coming from body
app.use(cors());                           // cross origin resource sharing .....
app.use(cookieparser())                    // parses coookies 

const Port = 4000;
const url = "mongodb://localhost:27017/mr_kitchen";

if (mongoose.connect(url)) {
  console.log(`Database Connected on ${url}`);
} else {
  console.log("Database Eror ");
}

//user routes

// not secured .......no is Authenticated handler will be used in these routes
app.post("/user/register", multerMid, registerController);
app.post("/user/login", loginController);
app.post('/user/forgotpassword' , forgotPassController )
app.post('/user/updatePassword'  , updatePassWordController )



// secured user routes 
app.post('/user/logout' ,isAuthenticated, logoutController)
app.post('/user/delete/me' , isAuthenticated , deleteUserController)
app.post('/user/changePassword' , isAuthenticated , changePassWordController )





//user/order routes
app.post("/user/order/new", isAuthenticated, orderHandler);
app.post("/user/order/cancel", isAuthenticated, cancelOrderHandler);


// server start
app.listen(Port, () => {
  console.log(`server started on port ${Port}`);
});
