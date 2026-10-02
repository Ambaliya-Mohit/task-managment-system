import express from "express";
import bcrypt from "bcryptjs";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

import authMiddleware from "../middleware/auth.js";
import requireRole from "../middleware/role.js";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const usersFilePath = path.join(__dirname, "../data/users.json");

// GET ALL USERS
router.get(
  "/",
  authMiddleware,
  requireRole("ADMIN"),
  async (req, res) => {
    try {
      const fileData = await fs.readFile(usersFilePath, "utf-8");
      const users = JSON.parse(fileData);

      const safeUsers = users.map(
        ({ password, ...user }) => user
      );

      res.json({
        users: safeUsers,
      });
    } catch (error) {
      console.error("Get users error:", error);

      res.status(500).json({
        message: "Server error",
      });
    }
  }
);

// CREATE USER
router.post(
  "/",
  authMiddleware,
  requireRole("ADMIN"),
  async (req, res) => {
    try {
      const { name, email, password, role } = req.body;

      if (!name || !email || !password || !role) {
        return res.status(400).json({
          message: "Name, email, password and role are required",
        });
      }

      const allowedRoles = ["ADMIN", "MANAGER", "MEMBER"];

      if (!allowedRoles.includes(role)) {
        return res.status(400).json({
          message: "Invalid role",
        });
      }

      const normalizedEmail = email.toLowerCase().trim();

      const fileData = await fs.readFile(
        usersFilePath,
        "utf-8"
      );

      const users = JSON.parse(fileData);

      const existingUser = users.find(
        (user) => user.email === normalizedEmail
      );

      if (existingUser) {
        return res.status(409).json({
          message: "User already exists",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = {
        id: `USR-${Date.now()}`,
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
        role,
        status: "ACTIVE",
      };

      users.push(newUser);

      await fs.writeFile(
        usersFilePath,
        JSON.stringify(users, null, 2)
      );

      res.status(201).json({
        message: "User created successfully",
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          status: newUser.status,
        },
      });
    } catch (error) {
      console.error("Create user error:", error);

      res.status(500).json({
        message: "Server error",
      });
    }
  }
);

// UPDATE USER STATUS / ROLE
router.patch(
  "/:id",
  authMiddleware,
  requireRole("ADMIN"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { role, status } = req.body;

      const fileData = await fs.readFile(
        usersFilePath,
        "utf-8"
      );

      const users = JSON.parse(fileData);

      const userIndex = users.findIndex(
        (user) => user.id === id
      );

      if (userIndex === -1) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      if (role) {
        const allowedRoles = ["ADMIN", "MANAGER", "MEMBER"];

        if (!allowedRoles.includes(role)) {
          return res.status(400).json({
            message: "Invalid role",
          });
        }

        users[userIndex].role = role;
      }

      if (status) {
        const allowedStatuses = ["ACTIVE", "INACTIVE"];

        if (!allowedStatuses.includes(status)) {
          return res.status(400).json({
            message: "Invalid status",
          });
        }

        users[userIndex].status = status;
      }

      await fs.writeFile(
        usersFilePath,
        JSON.stringify(users, null, 2)
      );

      const { password, ...safeUser } = users[userIndex];

      res.json({
        message: "User updated successfully",
        user: safeUser,
      });
    } catch (error) {
      console.error("Update user error:", error);

      res.status(500).json({
        message: "Server error",
      });
    }
  }
);

export default router;