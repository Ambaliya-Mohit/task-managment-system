import express from "express";
import bcrypt from "bcryptjs";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { generateToken } from "../utils/jwt.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const usersFilePath = path.join(__dirname, "../data/users.json");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    // 2. Normalize email
    const normalizedEmail = email.toLowerCase().trim();

    // 3. Read users.json
    const fileData = await fs.readFile(usersFilePath, "utf-8");
    const users = JSON.parse(fileData);

    // 4. Check existing user
    const existingUser = users.find(
      (user) => user.email === normalizedEmail
    );

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    // 5. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 6. Create new user
    const newUser = {
      id: `USR-${Date.now()}`,
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role: "MEMBER",
    };

    // 7. Save user
    users.push(newUser);

    await fs.writeFile(
      usersFilePath,
      JSON.stringify(users, null, 2)
    );

    // 8. Don't send password back
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Register error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});
// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const fileData = await fs.readFile(usersFilePath, "utf-8");
    const users = JSON.parse(fileData);

    const user = users.find(
      (user) => user.email === normalizedEmail
    );

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    if (user.status === "INACTIVE") {
      return res.status(403).json({
        message: "Your account is inactive",
      });
    }

    const token = generateToken(user);

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});
// CURRENT USER
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const fileData = await fs.readFile(usersFilePath, "utf-8");
    const users = JSON.parse(fileData);

    const user = users.find(
      (user) => user.id === req.user.id
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.status === "INACTIVE") {
      return res.status(403).json({
        message: "Your account is inactive",
      });
    }

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status || "ACTIVE",
      },
    });
  } catch (error) {
    console.error("Get current user error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

export default router;