const express = require("express");
const { seedUser } = require("../Seed/User");
const applyMiddleware = require("./middleware");
const routers=require('./routes')

// express app
const app = express();
applyMiddleware(app);
app.use(routers)

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

app.use((err, _req, res, next) => {
  console.log(err.message)
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

module.exports = app;
