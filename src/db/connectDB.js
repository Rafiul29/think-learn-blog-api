const mongoose = require("mongoose");

let connectionURL = process.env.DB_CONNETION_URL;
connectionURL = `${connectionURL}/${process.env.DB_NAME}`;

// mongoose
//   .connect(connectionURL)
//   .then(() => {
//     console.log("Database connection successful");
//     // seedUser(10);
//   })
//   .catch((err) => {
//     console.log("Database connection failed");
//     console.log("Error ", err.message);
//   });

const connectDB = async () => {
  await mongoose.connect(connectionURL);
  console.log("Database Connected")
};

module.exports = connectDB;
