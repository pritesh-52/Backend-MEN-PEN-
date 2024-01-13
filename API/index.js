const expres = require("express");
const app = expres();
const router = require("./src/router/router");
const noterouter = require("./src/router/noterouter");
app.use(expres.json());
app.use(router);
app.use(noterouter);
require('dotenv').config();
require("./src/db/conn");

const PORT=process.env.PORT
app.listen(8000, (req, res) => {
  console.log("start");
});
