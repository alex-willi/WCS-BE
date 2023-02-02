require("dotenv").config();

const mongoose = require("mongoose");
const { MONGODB_URI } = process.env;

mongoose.set("strictQuery", true);
mongoose.connect(
  MONGODB_URI ||
    "mongodb+srv://alex:alex1234@cluster0.jzxfujg.mongodb.net/?retryWrites=true&w=majority"
);

mongoose.connection
  .on("open", () => console.log("You are connected to mongoose"))
  .on("close", () => console.log("You are disconnected from mongoose"))
  .on("error", (error) => console.log(error));
