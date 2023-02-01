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
module.exports = router;
