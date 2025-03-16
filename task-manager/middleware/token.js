const jwt = require("jsonwebtoken");
const User = require("../model/model");

// const authenticateUser = (req, res, next) => {
//   const token = req.header("Authorization")?.split(" ")[1];

//   if (!token) {
//     return res
//       .status(401)
//       .json({ message: "Access denied. No token provided." });
//   }

//   try {
//     const verified = jwt.verify(token, "your_secret_key");
//     req.user = verified;
//     next();
//   } catch (error) {
//     res.status(400).json({ message: "Invalid token" });
//   }
// };

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).send({ error: "Authentication token missing" });
    }
    const decoded = jwt.verify(token, "my_secret_key");
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please Authentificate " });
  }
};

module.exports = auth;
