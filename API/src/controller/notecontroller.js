const notemodel = require("../model/notes");

exports.createnote = async (req, res) => {
  try {
    //console.log(req.userId);
    const { title, desc } = req.body;
    const createdata = new notemodel({
      title: title,
      desc: desc,
      userId: req.userId,
    });
    const data = await createdata.save();
    res.status(200).json(data);
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "somentihg went wrong" });
  }
};

exports.getnotes = async (req, res) => {
  try {
    const getnote = await notemodel.find({ userId: req.userId });
    res.status(200).json(getnote);
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "somentihg went wrong" });
  }
};

exports.deltenote = async (req, res) => {
  try {
    const _id = req.params.id;
    const deletdata = await notemodel.findByIdAndDelete(_id);
    res.status(200).json({ message: "Delete Data Succesfullt" });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "somentihg went wrong" });
  }
};

exports.updatenote = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, desc } = req.body;
    const newnote = {
      title: title,
      desc: desc,
      userId: req.userId,
    };
    const updatta = await notemodel.findByIdAndUpdate(id, newnote, {
      new: true,
    });
    res.status(200).json(updatta);
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "somentihg went wrong" });
  }
};
