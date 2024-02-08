const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const transporter =require("../utils/nodemailer")
const cloudinary = require("../utils/cloudinary")




const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const imagePath = req.file.path;        // image path is parsed multer 

    const existingUser = await User.findOne({ email });
    
    const encryptePass = await bcrypt.hash(password, 10);

    if (username && email && password !== "") {
      if (!existingUser) {


        const upload = await cloudinary.uploader.upload(imagePath, {
          folder: "mr.kitchen",
        });

        const profilePicUrl = upload.secure_url;

        if (upload) {
          const newUser = new User({
            username,
            profilePicUrl,
            email,
            password: encryptePass,
          });

          await newUser.save();

          res.status(201).json({ message: " Registration Succesful" });
        } else {
          res.json({ message: "kindly select an image less than 5mb!" });
        }
      } else {
        res.json({ message: "user Already exists" });
      }
    } else {
      res.json({ message: "All credentials Required!" });
    }
  } catch (error) {
    console.log(error);
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isUser = await User.findOne({ email }); // linear search method in mongooose

    if (email && password !== "") {
      if (isUser) {
        const passverify = bcrypt.compare(password, isUser.password);
        const secretkey = process.env.SECRET_KEY;

        if (passverify) {
          const token = jwt.sign(
            { appUser: isUser.username, appuserEmail: isUser.email , userId : isUser._id},
            {expires : "1h"},
            secretkey
          );

          res.cookie("token", token, { httpOnly: true });

          res.status(201).json({ message: "Logged in succesfully!", token });
        } else {
          res.json({ message: "Password incorrect!" });
        }
      } else {
        res.json({ message: "User doesnot exists!" });
      }
    } else {
      res.json({ message: "All credentials Required!" });
    }
  } catch (error) {
    console.log(error);
  }
};

const logoutController = async (req, res) => {
  try {
    const email = req.body.email;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.clearCookie("token");
      res.status(200).json({ message: "Logout Succesfully !" });
    } else {
      res.json({ message: " user Not found " });
    }
  } catch (err) {
    console.log(err);
  }
};

const deleteUserController = async (req, res) => {
  try {
    const {userId} =req.info
   

    const isUser = await User.findByIdAndDelete(userId);

    if (isUser) {
      res.json({ message: "User Deleted Succesfully" });
    } else {
      res.json({ message: "User Not Found +  Already deleted " });
    }
  } catch (err) {
    console.log(err);
  }
};

const forgotPassController = async (req, res) => {
try{

const {email} = req.body
const userExists = await User.findOne({email})

if(!userExists){
  return res.json({message : "user Doesnot Exists"})
}else{

  const sendMail = await transporter.sendMail({
   from : "irfanusuf33@gmail.com",
   to : `${email}`,
   subject : "Change Password",
   text : "link "    //pending 
  })

if(sendMail){
   res.json({message : "Password Reset link has been sent to your Registered Email"})
}
else{
res.json({message : "Some Eror"})
}
}


}catch(err){


}

};

const updatePassWordController  = async (req, res) => {
  try {


    const _id = req.query._id
    const {newPassword , ConfirmNewPassWord} = req.body

    const isUser = await User.findById(_id)

    if(password === ConfirmPassWord){


//home work 

      // const UpdatePass = isUser.          // home work 

    }

    // console.log(isUser)
   


  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  registerController,
  loginController,
  logoutController,
  deleteUserController,
  forgotPassController,
  updatePassWordController
};
