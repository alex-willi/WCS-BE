const mongoose = require("mongoose");

const associateSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    password: { type: String },
    role: { type: String },
    projects: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret) => {
        delete ret.password;
        return ret;
      },
    },
  }
);

const Associate = mongoose.model("associate", associateSchema);

module.exports = Associate;
