const express = require("express");
const router = express.Router();
const Project = require("../models/project");
const { handleValidateOwnership, requireToken } = require("../middleware/auth");

router.get("/owner", requireToken, async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.user._id });
    if (!projects) return res.status(404).send("No projects found");
    res.send(projects);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const projects = await Project.find({});
    res.send(projects);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/", requireToken, async (req, res, next) => {
  try {
    const owner = req.user._id;
    req.body.owner = owner;

    const newProject = await Project.create(req.body);
    res.status(201).json({
      project: newProject,
    });
  } catch (error) {
    res.status(400).json({ message: "Error creating project", error });
  }
});

router.put("/:id", requireToken, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!project) return res.status(404).send("Project not found");
    res.send(project);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
