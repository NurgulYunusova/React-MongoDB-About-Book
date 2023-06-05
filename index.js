const express = require("express");
const { db } = require("./config/db");
const { countryRoutes } = require("./routes/countryRoutes");
const { bookRoutes } = require("./routes/bookRoutes");
const { writerRoutes } = require("./routes/writerRoutes");
const app = express();
const fileUpload = require("express-fileupload");

app.use(fileUpload());

require("dotenv").config();

db.connect();

app.use(express.json());

app.use("/api/countries", countryRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/writers", writerRoutes);

app.listen(3300, () => {
  console.log("Express is running...");
});
