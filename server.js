require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const { PORT } = process.env;
require("./config/connection");
const associateController = require("./controllers/associate");
const authController = require("./controllers/auth");
const projectController = require("./controllers/project");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

app.use("/associate", associateController);
app.use("/auth", authController);
app.use("/project", projectController);

app.get("/", (req, res) => {
  res.redirect("/project");
});

app.listen(process.env.PORT || 4000);
