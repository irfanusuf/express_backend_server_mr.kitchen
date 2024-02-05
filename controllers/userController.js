const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dbo0xmbd7",
  api_key: "717735839128615",
  api_secret: "fqcjtd3HxpH_t1dAEtqr595ULW0",
});

const registerController = async (req, res) => {
  try {
    const { username, email, password,} = req.body;

    const  imagePath = req.file.path
    const existingUser = await User.findOne({ email });
    const encryptePass = await bcrypt.hash(password, 10);

    if (username && email && password !== "") {
      if (!existingUser) {


        const upload = await cloudinary.uploader.upload(imagePath ,  {
          folder: "mr.kitchen",
        })


  

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
        }else {

          res.json({message : "kindly select image !"})
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

        const token = jwt.sign(
          { appUser: isUser.username, appuserEmail: isUser.email },
          secretkey
        );

        if (passverify) {
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

module.exports = { registerController, loginController };
