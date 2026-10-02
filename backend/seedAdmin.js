import bcrypt from "bcryptjs";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const usersFilePath = path.join(__dirname, "data/users.json");

const adminEmail = "admin@projecthub.com";
const adminPassword = "Admin@123";

async function seedAdmin() {
  try {
    const fileData = await fs.readFile(usersFilePath, "utf-8");
    const users = JSON.parse(fileData);

    const existingAdmin = users.find(
      (user) => user.email === adminEmail
    );

    if (existingAdmin) {
      console.log("Admin user already exists.");
      return;
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const adminUser = {
      id: "USR-ADMIN-001",
      name: "System Administrator",
      email: adminEmail,
      password: hashedPassword,
      role: "ADMIN",
      status: "ACTIVE",
    };

    users.push(adminUser);

    await fs.writeFile(
      usersFilePath,
      JSON.stringify(users, null, 2)
    );

    console.log("Admin user created successfully.");
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);
  } catch (error) {
    console.error("Failed to seed admin:", error);
  }
}

seedAdmin();