const { default: mongoose } = require("mongoose");

const bookSchema = new mongoose.Schema({
  name: String,
  description: String,
  publishDate: Date,
  imagePath: String,
  writer: { type: mongoose.Schema.Types.ObjectId, ref: "Writer" },
  addDate: {
    type: Date,
    default: Date.now,
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = {
  Book,
};
