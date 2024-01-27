const User = require("../models/userModel");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    const encryptePass = await bcrypt.hash(password , 10)

    if (username && email && password !== "") {
      if (!existingUser) {
        const newUser = new User({ username, email, password : encryptePass  });

       await newUser.save();

       res.status(201).json({ message: " Registration Succesful" });
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


const loginController =async (req , res) =>{





  try{
    const {email , password} = req.body 
    const isUser = await User.findOne({email})      // linear search method in mongooose
  
  
    if(email && password !==  ""){
      if(isUser){
  
        const passverify = await bcrypt.compare(password , isUser.password )


        const token = await jwt.sign( {appUser : isUser.username , appuserEmail : isUser.email} , 'thisisasecretkey')
        
        if(passverify){
          res.status(201).json({message : "Logged in succesfully!" , token })
        }
        else {
          res.json({message : "Password incorrect!"})
        }
      }
      else{
        res.json({message : "User doesnot exists!"})
      }
  
  
    }
    else{
      res.json({message  : "All credentials Required!"})
    }
  

  }
  catch(error){
    console.log(error)
  }
 



}



module.exports = {registerController , loginController};
