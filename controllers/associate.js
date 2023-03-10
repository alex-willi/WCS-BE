const express = require("express");
const router = express.Router();
const Associate = require("../models/associate");
const { requireToken } = require("../middleware/auth");
const User = require("../models/User");
router.post("/", requireToken, async (req, res, next) => {
  try {
    const owner = req.user._id;
    req.body.owner = owner;

    const associateCount = await Associate.count({ owner });

    const limit = 1;
    if (associateCount >= limit) {
      return res.status(201).json({
        message: `You already have the maximum number of associates (${limit})`,
      });
    }

    const newAssociate = await Associate.create(req.body);
    res.status(201).json({
      associate: newAssociate,
    });
  } catch (error) {
    res.status(400).json({ message: "Error creating associate", error });
  }
});
router.get("/", requireToken, async (req, res, next) => {
  try {
    const owner = await User.findOne({ _id: req.user._id });
    console.log(owner);
    const associate = await Associate.findOne({ owner: req.user._id });

    if (!associate) {
      return res
        .status(404)
        .json({ error: "Associate not found", owner: req.user._id });
    }
    res.status(200).json({ associate: associate, owner: owner });
  } catch (err) {
    res.status(400).json({ error: err });
    next(err);
  }
});
router.get("/:id", requireToken, async (req, res, next) => {
  try {
    const foundAssociate = await Associate.findById(req.params.id);

    res.status(200).json({ associate: foundAssociate });
  } catch (err) {
    res.status(400).json({ error: err });
    next(err);
  }
});
router.put("/:id", requireToken, async (req, res) => {
  try {
    const updatedassociate = await Associate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedassociate);
  } catch (error) {
    //send error
    res.status(400).json({ error: error.message });
  }
});
router.delete("/:id", requireToken, async (req, res) => {
  try {
    const associate = await Associate.findByIdAndDelete(req.params.id);
    res.status(201).json(associate);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});
module.exports = router;
