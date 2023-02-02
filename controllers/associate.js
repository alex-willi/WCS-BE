const express = require("express");
const router = express.Router();
const Associate = require("../models/associate");
const { handleValidateOwnership, requireToken } = require("../middleware/auth");
router.post("/", requireToken, async (req, res, next) => {
  try {
    const owner = req.user._id;
    req.body.owner = owner;

    const associateCount = await Associate.count({ owner });

    const limit = 1;
    if (associateCount >= limit) {
      return res.status(400).json({
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
    const associate = await Associate.findById(req.params.id)
      .populate("owner")
      .exec();
    res.status(200).json(associate);
  } catch (err) {
    res.status(400).json({ error: err });
    next(err);
  }
});
router.put("/:id", requireToken, async (req, res) => {
  try {
    handleValidateOwnership(req, await Associate.findById(req.params.id));
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
    handleValidateOwnership(req, await Associate.findById(req.params.id));
    const associate = await Associate.findByIdAndDelete(req.params.id);
    res.status(201).json(associate);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});
module.exports = router;
