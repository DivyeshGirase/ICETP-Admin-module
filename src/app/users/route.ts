import { NextRequest, NextResponse } from "next/server";

interface User {
  id: number;
  name: string;
  email: string;
}

let users: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Doe", email: "jane@example.com" },
];

// Handle GET request (fetch all users)
export async function GET() {
  return NextResponse.json(users);
}

// Handle POST request (create a new user)
export async function POST(req: NextRequest) {
  const { name, email } = await req.json();
  const newUser: User = { id: users.length + 1, name, email };
  users.push(newUser);

  return NextResponse.json(newUser, { status: 201 });
}
