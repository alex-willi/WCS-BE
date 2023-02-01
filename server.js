require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const { PORT } = process.env;
require("./config/connection");
const associateController = require("./controllers/associate");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

app.use("/associate", associateController);

app.get("/", (req, res) => {
  //   res.redirect("/");
});

app.listen(PORT, () => console.log(`Listening to port: ${PORT}`));
