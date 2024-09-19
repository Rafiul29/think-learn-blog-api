require("dotenv").config();
const http=require('http')
const { connectDB } = require("./db/index");
const app=require('./app')

const server=http.createServer(app)

const port=process.env.PORT || 4000

const main = async () => {
  try {
    await connectDB();

    server.listen(`${port}`, () => {
      console.log(`server is listening on port ${port}`);
    });
  } catch (err) {
    console.log("Database Error");
    console.log(err);
  }
};

main();
