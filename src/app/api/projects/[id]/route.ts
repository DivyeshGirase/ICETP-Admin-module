import { NextResponse } from "next/server";
import db from "@/lib/db";
import { OkPacket, RowDataPacket, FieldPacket } from "mysql2";


// Handle PATCH requests
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const { status }: { status: string } = await req.json();
    const { id } = params; // Get the ID from URL parameters

    if (!status) {
      return NextResponse.json({ message: "Status is required." }, { status: 400 });
    }

    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      return NextResponse.json({ message: "Invalid ID format." }, { status: 400 });
    }

    // Execute the database query
    const [result]: [OkPacket, FieldPacket[]] = await db.query(
      "UPDATE projects SET status = ? WHERE id = ?",
      [status, numericId]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: "No project found with the given ID." }, { status: 404 });
    }

    return NextResponse.json({ message: "Project status updated successfully." });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: `Error updating project: ${error.message}` }, { status: 500 });
    }
    return NextResponse.json({ message: "Unknown error occurred." }, { status: 500 });
  }
}
