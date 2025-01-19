import { NextResponse } from "next/server";
import db from "@/lib/db";
import bcrypt from "bcrypt";

interface Admin {
  id: number;
  username: string;
  password: string; // This is the hashed password stored in the database
}

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    console.log("Login attempt:", { username, password });
    // Query the database for the admin user
    const [rows] = (await db.query("SELECT * FROM admin_users WHERE firstName = ?", [username])) as [Admin[], any];
    console.log("Query result:", rows);

    // Check if user exists
    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const user = rows[0];

    // Verify the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Successful login
    return NextResponse.json({ message: "Login successful" });

  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
