const moongoos = require("mongoose");
const noteschema = new moongoos.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  userId: {
    type: moongoos.Schema.Types.ObjectId,
    ref: "register",
    required: true,
  },
  createdat: {
    type: Date,
    default: Date.now(),
  },
});

const notemodel = new moongoos.model("notes", noteschema);
module.exports = notemodel;
