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

const {likeHandler , unlikeHandler} = require('./controllers/postController')
const {createItemHandler , getAllItems , getItem} = require('./controllers/adminController')
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


app.post("/user/register", multerMid, registerController);
app.post("/user/login", loginController);
app.post('/user/forgotpassword' , forgotPassController )
app.post('/user/updatePassword'  , updatePassWordController )
app.post('/user/delete/me', deleteUserController)
app.post('/user/logout' ,isAuthenticated, logoutController)
app.post('/user/changePassword' , isAuthenticated , changePassWordController )
app.post('/user/like', isAuthenticated , likeHandler)
app.post('/user/unlike', isAuthenticated , unlikeHandler)


// admin Routes

app.post('/admin/createitem' , multerMid , createItemHandler)




//user/order routes
app.post("/user/order/new", isAuthenticated, orderHandler);
app.post("/user/order/cancel", isAuthenticated, cancelOrderHandler);


app.get("/allItems" , getAllItems)
app.get("/items" , getItem)


// server start
app.listen(Port, () => {
  console.log(`server started on port ${Port}`);
});
