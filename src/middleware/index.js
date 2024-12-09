const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const OpenApiValidator = require("express-openapi-validator");
const path = require("path");

const swaggerDoc = YAML.load(path.resolve(__dirname,'../../swagger.yaml'));
// const swaggerDoc = YAML.load("./swagger.yaml");

const applyMiddleware = (app) => {
  app.use(express.json());
  app.use(morgan("dev"));
  app.use(cors());
  app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

  app.use(
    OpenApiValidator.middleware({
      apiSpec: path.resolve(__dirname, "../../swagger.yaml"),
      // apiSpec: "./swagger.yaml",
    })
  );
};

module.exports = applyMiddleware;
