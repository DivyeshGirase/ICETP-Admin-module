import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import db from "@/lib/db"; // Your database connection

// Define a User interface to type the result of the query
interface User {
  id: number;
  username: string;
  password: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { username, password } = req.body;

    try {
      // Fetch user from the database based on username
      const [rows] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
      const user = (rows as User[])[0]; // Cast rows to User[]

      if (!user) {
        return res.status(401).json({ message: "Invalid username or password" });
      }

      // Compare the provided password with the stored hash
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid username or password" });
      }

      // Authentication success, respond with a message (no token needed)
      return res.status(200).json({ message: "Login successful" });

    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ message: "Error during login" });
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
};
