const jwt = require("jsonwebtoken");

const authHandler = async (req, res) => {
  try {
     const  {token} =  req.body

    await jwt.verify(token, "thisisasecretkey", (err, decode) => {
      if (err) {
        res.json({ message: "Forbidden!" });
      } else if (decode) {
        res.json({ message: "Authorized!" ,  username : decode.appUser });
        console.log(decode)
      }
      
    });
  } catch (error) {}
};



module.exports = authHandler