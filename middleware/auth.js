const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) {
     return res.status(403).json({ message: "Forbidden!" });



    } else {
      await jwt.verify(token, "thisisasecretkey", (err, decode) => {
        
        if (err) {
        return  res.json({ message: "UnAuthorized" });
        } else {
          // console.log(decode);
          req.info = decode;
         return next()
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
};


module.exports = isAuthenticated















// const authHandler = async (req, res, next) => {
//   try {
//     const token = req.headers.token;
//     const secretkey = process.env.SECRET_KEY;
//     if (!token) {
//       return res.json({ message: "Unauthorized!" });
//     }

//     jwt.verify(token, secretkey, (err, decode) => {
//       if (err) {
//         return res.status(403).json({ message: "Forbidden!" });
//       }
//       console.log(decode);
//       return next();
//     });
//   } catch (error) {
//     res.status(500).json({ message: `${error}` });
//   }
// };

// module.exports = authHandler;
