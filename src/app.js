require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");

const swaggerDoc = YAML.load("./swagger.yaml");
const OpenApiValidator = require("express-openapi-validator");
// const { seedUser } = require("./Seed/User");
// express app
const app = express();
app.use(express.json());
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

app.use(
  OpenApiValidator.middleware({
    apiSpec: "./swagger.yaml",
  })
);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

let connectionURL = process.env.DB_CONNETION_URL;
connectionURL = `${connectionURL}/${process.env.DB_NAME}`;
console.log(connectionURL);
mongoose
  .connect(connectionURL)
  .then(() => {
    console.log("Database connection successful");
    // seedUser(10);
  })
  .catch((err) => {
    console.log("Database connection failed");
    console.log("Error ", err.message);
  });
app.listen(4000, () => {
  console.log("server is listening on port 4000");
});
