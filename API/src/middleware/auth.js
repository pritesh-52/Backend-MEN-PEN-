const jwt = require("jsonwebtoken");
require('dotenv').config();

const SCRETKEY = process.env.SCRETKEY;

const auth = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      let user = jwt.verify(token, SCRETKEY);
      req.userId = user.id;
    } else {
      res.status(400).json({ message: "Unauthories user" });
    }
    next();
  } catch (e) {
    res.status(405).json({ message: "Unauthi use" });
  }
};

module.exports = auth;
