const express = require("express");
const { countryController } = require("../controllers/countryController");
const { body } = require("express-validator");
const { validate } = require("../middleware/validation");

const countryRoutes = express.Router();

countryRoutes.get("/", countryController.getAll);

countryRoutes.get("/:id", countryController.getById);

countryRoutes.post(
  "/",
  body("name").notEmpty().withMessage("Name field cannot be empty!"),
  validate,
  countryController.add
);

countryRoutes.delete("/:id", countryController.deleteById);

module.exports = {
  countryRoutes,
};
