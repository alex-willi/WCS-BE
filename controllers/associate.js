const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Associate = require("../models/associate");
const {
  createAssociateToken,
  requireToken,
  handleValidateOwnership,
} = require("../middleware/auth");

router.post("/", async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);

    const passwordHash = await bcrypt.hash(req.body.password, salt);

    const pwStore = req.body.password;

    req.body.password = passwordHash;

    const newAssociate = await Associate.create(req.body);
    if (newAssociate) {
      req.body.password = pwStore;
      const authenticatedAssociateToken = createAssociateToken(
        req,
        newAssociate
      );
      res.status(201).json({
        associate: newAssociate,
        isLoggedIn: true,
        token: authenticatedAssociateToken,
      });
    } else {
      res.status(400).json({ error: "Something went wrong" });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
});
router.post("/login", async (req, res, next) => {
  try {
    const loggingassociate = req.body.email;
    const foundassociate = await User.findOne({ email: loggingassociate });
    const token = await createAssociatteToken(req, foundUser);
    res.status(200).json({
      associate: foundassociate,
      isLoggedIn: true,
      token: auth,
    });
  } catch (err) {
    res.status(401).json({ error: err.message });
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
router.put("/:id", async (req, res) => {
  try {
    const associate = await Associate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(201).json(associate);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const associate = await Associate.findByIdAndDelete(req.params.id);
    res.status(201).json(associate);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});
module.exports = router;
