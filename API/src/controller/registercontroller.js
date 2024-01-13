const registermodel = require("../model/register");
const bcrypt = require("bcrypt"); // use for bcrypt the password
const jwt = require("jsonwebtoken");
require('dotenv').config();
const SCRETKEY = process.env.SCRETKEY;

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existsingemail = await registermodel.findOne({ email: email });
    if (existsingemail) {
      res.status(400).json("user already exists");
    }
    const hashpassword = await bcrypt.hash(password, 10);
    const result = await registermodel.create({
      name: name,
      email: email,
      password: hashpassword,
    });
    const token = jwt.sign({ email: result.email, id: result._id }, SCRETKEY);
    res.status(201).json({ user: result, token: token });
  } catch (e) {
    res.status(400).json(e);
    console.log(e);
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existsingemail = await registermodel.findOne({ email: email });
    if (!existsingemail) {
      return res.status(404).json({ message: "User Does Not Existts" });
    }
    const matchpassowrd = await bcrypt.compare(
      password,
      existsingemail.password
    );
    if (!matchpassowrd) {
      return res.status(405).json({ message: "Invaild Creindtao" });
    }
    const token = jwt.sign(
      { email: existsingemail.email, id: existsingemail._id },
      SCRETKEY
    );
    res.status(201).json({ user: existsingemail, token: token });
  } catch (e) {
    res.status(e).json(e);
    console.log(e);
  }
};
