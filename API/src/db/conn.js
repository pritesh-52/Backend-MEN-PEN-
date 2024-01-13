const moongos = require("mongoose");
require('dotenv').config();

const DB =process.env.CONNECTIONSTRING;
moongos
  .connect(DB)
  .then(() => {
    console.log("connect");
  })
  .catch((e) => {
    console.log(e);
  });
