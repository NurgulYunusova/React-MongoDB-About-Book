const express = require("express");
const { writerController } = require("../controllers/writerController");
const { body } = require("express-validator");
const { validate } = require("../middleware/validation");

const writerRoutes = express.Router();

writerRoutes.get("/", writerController.getAll);

writerRoutes.get("/:id", writerController.getById);

writerRoutes.post(
  "/",
  // body("firstname").notEmpty().withMessage("First Name field cannot be empty!"),
  // body("lastname").notEmpty().withMessage("Last Name field cannot be empty!"),
  // body("birthdate").notEmpty().withMessage("Birthdate field cannot be empty!"),
  // validate,
  writerController.add
);

writerRoutes.delete("/:id", writerController.deleteById);

module.exports = {
  writerRoutes,
};
