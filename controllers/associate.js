const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const Associate = require("../models/associate");

router.post("/", async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(req.body.password, salt);

    req.body.password = passwordHash;

    const newAssociate = await Associate.create(req.body);

    res.status(201).json({
      associate: newAssociate,
      isLoggedIn: true,
    });
  } catch (error) {
    res.status(400).json({ message: "Error creating associate", error });
  }
});
router.get("/", async (req, res, next) => {
  try {
    const associates = await Associate.find({});
    res.status(200).json(associates);
  } catch {
    res.status(400).json(console.error);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const associate = await Associate.findById(req.params.id);
    // const projects = await Project.find({ associate: req.params.id });

    res.status(200).json(associate);
  } catch (err) {
    res.status(400).json({ error: err });
    next(err);
  }
});
module.exports = router;
