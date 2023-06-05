const { Writer } = require("../models/writer");

const writerController = {
  getAll: (req, res) => {
    let limitProduct = req.query.limit;

    Writer.find()
      .limit(limitProduct)
      .populate("country")
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  getById: (req, res) => {
    let id = req.params.id;

    Writer.findById(id)
      .then((data) => {
        if (data) res.json(data);
        else res.status(404).json({ msg: "Not found!" });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  add: (req, res) => {
    let writer = new Writer({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      birthdate: req.body.birthdate,
      country: req.body.country,
    });

    writer.save();

    res.json(writer);
  },
  deleteById: (req, res) => {
    let id = req.params.id;

    Writer.findByIdAndDelete(id)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
};

module.exports = {
  writerController,
};
