const moongos = require("mongoose");
const registerschema = new moongos.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});
const registermodel = new moongos.model("register", registerschema);
module.exports = registermodel;
