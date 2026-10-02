import express from "express";
import authMiddleware from "../middleware/auth.js";
import requireRole from "../middleware/role.js";
import {
  readCollection,
  writeCollection,
  makeId,
} from "../utils/jsonStore.js";

const router = express.Router();

const FILE_NAME = "projects.json";

// GET ALL PROJECTS
router.get("/", authMiddleware, async (req, res) => {
  try {
    const projects = await readCollection(FILE_NAME);

    res.json({
      projects,
    });
  } catch (error) {
    console.error("Get projects error:", error);

    res.status(500).json({
      message: "Failed to load projects",
    });
  }
});

// GET SINGLE PROJECT
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const projects = await readCollection(FILE_NAME);

    const project = projects.find(
      (item) => item.id === req.params.id
    );

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.json({
      project,
    });
  } catch (error) {
    console.error("Get project error:", error);

    res.status(500).json({
      message: "Failed to load project",
    });
  }
});

// CREATE PROJECT
router.post(
  "/",
  authMiddleware,
  requireRole("ADMIN", "MANAGER"),
  async (req, res) => {
    try {
      const {
        name,
        key,
        description,
        status,
        members,
        dueDate,
        progress,
      } = req.body;

      if (!name || !key || !description || !status) {
        return res.status(400).json({
          message:
            "Name, key, description and status are required",
        });
      }

      const projects = await readCollection(FILE_NAME);

      const normalizedKey = key.trim().toUpperCase();

      const existingProject = projects.find(
        (project) =>
          project.key.toUpperCase() === normalizedKey
      );

      if (existingProject) {
        return res.status(409).json({
          message: "Project key already exists",
        });
      }

      const newProject = {
        id: makeId("PRJ"),
        name: name.trim(),
        key: normalizedKey,
        description: description.trim(),
        status,
        members: Number(members) || 0,
        dueDate: dueDate || "",
        progress: Number(progress) || 0,
      };

      projects.push(newProject);

      await writeCollection(FILE_NAME, projects);

      res.status(201).json({
        message: "Project created successfully",
        project: newProject,
      });
    } catch (error) {
      console.error("Create project error:", error);

      res.status(500).json({
        message: "Failed to create project",
      });
    }
  }
);

// UPDATE PROJECT
router.patch(
  "/:id",
  authMiddleware,
  requireRole("ADMIN", "MANAGER", "MEMBER"),
  async (req, res) => {
    try {
      const projects = await readCollection(FILE_NAME);

      const projectIndex = projects.findIndex(
        (project) => project.id === req.params.id
      );

      if (projectIndex === -1) {
        return res.status(404).json({
          message: "Project not found",
        });
      }

      const allowedFields = [
        "name",
        "key",
        "description",
        "status",
        "members",
        "dueDate",
        "progress",
      ];

      for (const field of allowedFields) {
        if (req.body[field] !== undefined) {
          projects[projectIndex][field] = req.body[field];
        }
      }

      if (projects[projectIndex].key) {
        projects[projectIndex].key =
          projects[projectIndex].key
            .trim()
            .toUpperCase();
      }

      await writeCollection(FILE_NAME, projects);

      res.json({
        message: "Project updated successfully",
        project: projects[projectIndex],
      });
    } catch (error) {
      console.error("Update project error:", error);

      res.status(500).json({
        message: "Failed to update project",
      });
    }
  }
);

// DELETE PROJECT
router.delete(
  "/:id",
  authMiddleware,
  requireRole("ADMIN", "MANAGER"),
  async (req, res) => {
    try {
      const projects = await readCollection(FILE_NAME);

      const projectIndex = projects.findIndex(
        (project) => project.id === req.params.id
      );

      if (projectIndex === -1) {
        return res.status(404).json({
          message: "Project not found",
        });
      }

      const deletedProject = projects[projectIndex];

      projects.splice(projectIndex, 1);

      await writeCollection(FILE_NAME, projects);

      res.json({
        message: "Project deleted successfully",
        project: deletedProject,
      });
    } catch (error) {
      console.error("Delete project error:", error);

      res.status(500).json({
        message: "Failed to delete project",
      });
    }
  }
);

export default router;