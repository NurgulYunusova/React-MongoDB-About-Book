const express = require("express");
const app = express();

const { v4: uuidv4 } = require("uuid");

var fs = require("fs");

app.use(express.json());

const { Book } = require("../models/book");

const bookController = {
  getAll: (req, res) => {
    let limitProduct = req.query.limit;

    Book.find()
      .limit(limitProduct)
      .populate({
        path: "writer",
        populate: {
          path: "country",
        },
      })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  getById: (req, res) => {
    let id = req.params.id;

    Book.findById(id)
      .then((data) => {
        if (data) res.json(data);
        else res.status(404).json({ msg: "Not found!" });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  add: (req, res) => {
    let file = req.files.photo;
    let fileExt = file.name.substring(file.name.lastIndexOf("."));

    let path = __dirname + "/bookImages/" + uuidv4() + fileExt;

    file.mv(path, function (err) {
      if (!err) res.send("Success!");
      else res.status(500).json(err);
    });

    console.log(path);

    let book = new Book({
      name: req.body.name,
      description: req.body.description,
      publishDate: req.body.publishDate,
      imagePath: path,
      writer: req.body.writer,
    });

    book.save();

    res.json(book);
  },
  deleteById: (req, res) => {
    let id = req.params.id;

    Book.findByIdAndDelete(id)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
};

module.exports = {
  bookController,
};
