const express = require("express");
const router = express.Router();
const emp = require("../db/emp");
const e = require("express");

router.get("/getemp", async (req, res) => {
  try {
    const getemployee = await emp.query("SELECT *FROM emp");
    res.status(200).json(getemployee.rows);
  } catch (e) {
    res.status(400).json("Some Error has happen");
  }
});

router.post("/adddata", async (req, res) => {
  try {
    const { desc } = req.body;
    const addemp = await emp.query(
      "INSERT INTO emp (name, age) VALUES ($1, $2) RETURNING *",
      [desc]
    );
    res.json(addemp.rows[0]);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const { email } = req.body;
    const updatedata = await emp.query(
      "UPDATE emp SET name =$1 email =$2 WHERE id = $3",
      [name, email, id]
    );
    res.status(200).json("Data Has Been Updated");
  } catch (e) {
    res.status(400).json(e);
  }
});

/* Get All Data for Amd students */

router.get("/getamd/:city", async (req, res) => {
  try {
    const city = req.params.city;
    console.log(city);
    const getdata = await emp.query(`SELECT *FROM info where city='${city}'`);
    res.json(getdata.rows);
  } catch (e) {
    res.status(200).send(e);
  }
});

/* JOIN Queryies */
/* Simple Join */

router.get("/combine", async (req, res) => {
  try {
    const getdata = await emp.query(
      "SELECT *FROM info INNER JOIN information on info.id=information.id;"
    );
    setTimeout(() => {
      res.json(getdata.rows);
    }, 5000);
  } catch (e) {
    res.status(400).send(e);
  }
});

/* get maxium age data */

router.get("/getmaxage", async (req, res) => {
  try {
    const getdata = await emp.query(
      "SELECT *from emp where age=(select max(age) from emp)"
    );
    res.status(200).json(getdata.rows);
  } catch (e) {
    res.status(400).json("Data can't recive");
  }
});

router.get("/getbothdata", async (req, res) => {
  try {
    const getdata = await emp.query(
      "select a.name,a.city,b.age from info a join emp b on a.id=b.id"
    );
    res.status(200).json(getdata.rows);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
