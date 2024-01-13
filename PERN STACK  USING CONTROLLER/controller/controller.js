const pool = require("../db");

exports.createNote = async (req, res) => {
  try {
    const { description } = req.body;
    const adddata = await pool.query(
      "INSERT INTO note (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(adddata.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
};

exports.getNote = async (req, res) => {
  try {
    const getdata = await pool.query("SELECT *FROM note");
    res.json(getdata.rows);
  } catch (e) {
    console.log(e);
  }
};

exports.getparticulardata = async (req, res) => {
  try {
    const { id } = req.params;
    const oneNote = await pool.query("SELECT * FROM note WHERE note_id = $1", [
      id,
    ]);
    res.json(oneNote.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
};

exports.deletenote = async (req, res) => {
  try {
    const { id } = req.params;
    const deletdata = await pool.query("DELETE FROM note WHERE note_id = $1", [
      id,
    ]);
    res.json({ message: "Data has beem deleted" });
  } catch (e) {
    console.log(e);
  }
};

exports.updatadata = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const update = await pool.query(
      "UPDATE note SET description =$1 WHERE note_id =$2",
      [description, id]
    );
    res.json("Not has update");
  } catch (e) {
    console.log(e);
  }
};


/* Find the data which start from */

exports.startfromp=async(req,res)=>{
    try{
        const name=req.params.name;
        console.log(name);
        //String(name)
        const finddata=await pool.query(`SELECT *FROM note where description like '${name}%'`);
        res.json(finddata.rows);

    }
    catch(e)
    {
        console.log(e);
    }
}

