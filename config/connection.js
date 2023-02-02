require("dotenv").config();

const mongoose = require("mongoose");
const { MONGO_URI } = process.env;

mongoose.set("strictQuery", true);
mongoose.connect(MONGO_URI);
console.log(MONGO_URI);
mongoose.connection
  .on("open", () => console.log("You are connected to mongoose"))
  .on("close", () => console.log("You are disconnected from mongoose"))
  .on("error", (error) => console.log(error));
