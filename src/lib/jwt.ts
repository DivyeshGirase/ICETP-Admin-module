import jwt from "jsonwebtoken";

const JWT_SECRET = "your-secret-key"; // Replace with a secure key

export const generateToken = (payload: object) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
