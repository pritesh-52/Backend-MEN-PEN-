const emp = require("../db/emp");

exports.addempdata = async (req, res) => {
  try {
    const { desc } = req.body;
    const addemp = await emp.query(
      "INSERT INTO emp (name, email) VALUES ($1, $2) RETURNING *",
      [desc]
    );
    res.json(addemp.rows[0]);
  } catch (e) {
    console.log(e);
  }
};
