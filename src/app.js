const express = require("express");
const { seedUser } = require("../Seed/User");
const applyMiddleware = require("./middleware");

// express app
const app = express();
applyMiddleware(app);

app.use("/health", (req, res) => {
  console.log(req.user);
  res.status(200).json({
    health: "Ok",
  });
});

// Generate 404 Error
// app.use("*", (req, res, next) => {
//   const error = new Error("Requested resource not found");
//   console.log(error)
//   error.code = 404;
//   error.error = "Not Found";
//   next(error);
// });

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

module.exports = app;
