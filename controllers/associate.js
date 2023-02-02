const express = require("express");
const router = express.Router();
const Associate = require("../models/associate");
const { handleValidateOwnership, requireToken } = require("../middleware/auth");
router.post("/", async (req, res, next) => {
  try {
    const newAssociate = await Associate.create(req.body);
    res.status(201).json({
      associate: newAssociate,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", requireToken, async (req, res, next) => {
  try {
    const associate = await Associate.findOne({ owner: req.user._id })
      .populate("owner")
      .exec();
    if (!associate) {
      return res.status(404).json({ error: "Associate not found" });
    }
    res.status(200).json(associate);
  } catch (err) {
    res.status(400).json({ error: err });
    next(err);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const foundAssociate = await Associate.findById(req.params.id);

    res.status(200).json({ associate: foundAssociate });
  } catch (err) {
    res.status(400).json({ error: err });
    next(err);
  }
});
router.put("/:id", async (req, res) => {
  try {
    const updatedassociate = await Associate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedassociate);
  } catch (error) {
    //send error
    res.status(400).json({ error: err });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const associate = await Associate.findByIdAndDelete(req.params.id);
    res.status(204).json(associate);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});
module.exports = router;
