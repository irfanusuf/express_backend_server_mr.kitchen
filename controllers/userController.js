const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const transporter = require("../utils/nodemailer");
const cloudinary = require("../utils/cloudinary");

// integrated with front end
const registerController = async (req, res) => {
  try {
    const { username, email, password, image } = req.body;

    // const imagePath = req.file.path; // image path is parsed multer   // this method is for postman testing

    const existingUser = await User.findOne({ email });

    const encryptePass = await bcrypt.hash(password, 10);

    if (username && email && password !== "") {
      if (!existingUser) {
        const upload = await cloudinary.uploader.upload(image, {
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

// home work add 2fa authentication
// integrated with front end
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isUser = await User.findOne({ email }); // linear search method in mongooose

    if (email && password !== "") {
      if (isUser) {
        const passverify = await bcrypt.compare(password, isUser.password);

        if (passverify) {
          const token = jwt.sign(
            {
              userId: isUser._id,
            },
            "secretkey"
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

// have to revamppp

const logoutController = async (req, res) => {
  try {
    const {email} = req.body;

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

// integration will be done 29 feb 2024
const deleteUserController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const isUser = await User.findOne({ email });

    if (email !== "" && password !== "") {
      if (isUser) {
        const userId = isUser._id;
        const passverify = await bcrypt.compare(password, isUser.password);

        if (passverify) {
          const delUser = await User.findByIdAndDelete(userId);

          if (delUser) {
            res.json({ message: "User Deleted Succesfully" });
          }
        }
        else{

          res.json({message : "PassWord Doesnot Match"})
        }
      } else {
        res.json({ message: "User Not Found +  Already deleted " });
      }
    } else {
      res.json({ message: " All Credentials Required !" });
    }
  } catch (err) {
    console.log(err);
  }
};

// already integrated
// revamp needed
const forgotPassController = async (req, res) => {
  try {
    const { email } = req.body;

    if (email !== "") {
      const userExists = await User.findOne({ email });

      const userId = userExists._id;
      if (!userExists) {
        return res.json({ message: "user Doesnot Exists" });
      } else {
        const sendMail = await transporter.sendMail({
          from: "irfanusuf33@gmail.com",
          to: `${email}`,
          subject: "Change Password",
          text: `http://localhost:3000/change-password?userId= ${userId}`, //pending
        });

        if (sendMail) {
          const userId = userExists._id;
          res.status(201).json({
            message:
              "Password Reset link has been sent to your Registered Email",
            userId,
          });
        } else {
          res.json({ message: "Some Eror" });
        }
      }
    } else {
      res.json({ message: "Email Required" });
    }
    // console.log(userExists)
    const userId = userExists._id;

    if (!userExists) {
      return res.json({ message: "user Doesnot Exists" });
    } else {
      const sendMail = await transporter.sendMail({
        from: "irfanusuf33@gmail.com",
        to: `${email}`,
        subject: "Change Password",
        text: "link ", //pending
      });

      if (sendMail) {
        res.status(201).json({
          message: "Password Reset link has been sent to your Registered Email",
          userId,
        });
      } else {
        res.json({ message: "Some Eror" });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

// already integrated
// reavamp needed as per the inayat's suggestion
const updatePassWordController = async (req, res) => {
  try {
    const { newPassword, confirmNewPassWord } = req.body;
    const { userId } = req.query;

    if (newPassword !== "" && confirmNewPassWord !== "") {
      if (newPassword === confirmNewPassWord) {
        const hashPassword = await bcrypt.hash(newPassword, 10);

        const user = await User.findByIdAndUpdate(userId, {
          password: hashPassword,
        });

        console.log(user);
        const updateUser = await user.save();
        if (updateUser) {
          res.status(201).json({ message: "PassWord Updated SucessFully!" });
        }
      } else {
        res.json({ message: "PassWord Doesnot Match !" });
      }
    } else {
      res.json({ message: "Both of the feilds Required !" });
    }
  } catch (err) {
    console.log(err);
  }
};

// integration will be done on 1 march
const changePassWordController = async (req, res) => {
  try {
    const { newPassword, ConfirmNewPassWord } = req.body;
    const userId = req.info._id;

    if (newPassword !== "" && ConfirmNewPassWord !== "") {
      if (newPassword === ConfirmNewPassWord) {
        const hashPassword = await bcrypt.hash(newPassword, 10);

        const user = await User.findByIdAndUpdate(userId, {
          password: hashPassword,
        });

        const updateUser = await user.save();
        if (updateUser) {
          res.json({ message: " PassWord Updated SucessFully!" });
        }
      } else {
        res.json({ message: "PassWord Doesnot Match !" });
      }
    } else {
      res.json({ message: "Both of the feilds Required !" });
    }
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
  updatePassWordController,
  changePassWordController,
};
