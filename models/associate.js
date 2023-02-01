const mongoose = require("mongoose");

const associateSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  role: { type: String },
  projects: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
});

Associate = mongoose.model("associate", associateSchema);

module.exports = Associate;
