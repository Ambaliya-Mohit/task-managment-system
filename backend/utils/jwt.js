import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "projecthub-secret-key";

export function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
}

export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}