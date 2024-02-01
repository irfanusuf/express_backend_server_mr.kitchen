const jwt = require("jsonwebtoken");


const authHandler = async (req, res, next) => {
  try {
    const token = req.headers.token;
    const  secretkey = process.env.SECRET_KEY
    if (!token) {
      return res.json({ message: "Unauthorized!" });
    }

    jwt.verify(token, secretkey, (err, decode) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden!" });
      }
      console.log(decode);
      return next();
    });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
};

module.exports = authHandler;
