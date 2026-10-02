import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function readCollection(filename) {
  const filePath = path.join(__dirname, "../data", filename);

  const raw = await fs.readFile(filePath, "utf-8");

  return JSON.parse(raw);
}

export async function writeCollection(filename, data) {
  const filePath = path.join(__dirname, "../data", filename);

  await fs.writeFile(
    filePath,
    JSON.stringify(data, null, 2)
  );
}

export function makeId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 7)}`;
}