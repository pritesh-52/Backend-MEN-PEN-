const express = require("express");
const app = express();
const controller = require("./controller/controller");
const pool = require("./db");
//const empcontrollwr=require("./controller/empcontroller");

app.use(express.json());
app.use("/router",require("./router/router"));
app.post("/emp/adddata", async (req, res) => {
  try {
    const { name, age } = req.body;
    const addemp = await pool.query(
      "INSERT INTO emp (name, age) VALUES ($1, $2) RETURNING *",
      [name, age]
    );
    res.json(addemp.rows[0]);
  } catch (e) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/emp/agemore/:age", async (req, res) => {
  try {
    const { age } = req.params;
    const getdata = await pool.query(`SELECT *FROM emp where age>${age}`);
    res.status(200).json(getdata.rows);
  } catch (e) {
    res.status(400).json(e);
  }
});

//app.use("/admin", require("./router/router"));
app.post("/adddata", controller.createNote);
app.get("/getdata", controller.getNote);
app.get("/getdata/:id", controller.getparticulardata);
app.delete("/delete/:id", controller.deletenote);
app.put("/update/:id", controller.updatadata);
app.get("/getp/:name", controller.startfromp);

//app.post("/admin/adddata",empcontrollwr.addempdata);
app.listen(8000, (req, res) => {
  console.log("Start");
});
