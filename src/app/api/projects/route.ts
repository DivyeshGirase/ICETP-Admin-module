import { NextResponse } from "next/server";
import db from "@/lib/db";
import { RowDataPacket } from "mysql2"; // Import RowDataPacket type
import { OkPacket } from "mysql2";

// Define the type for a project
interface Project {
  id: string;
  name: string;
  price: number;
  status: string;
  describe_project?: string;
  created_at: string;
  updated_at: string;
}

// Define the payload structure for the PUT request
interface UpdateProjectPayload {
  id: string;
  status: string;
}

// Fetch Projects with Pagination
export async function GET(req: Request) {
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get('page') || '1', 10); // Default to page 1
  const limit = parseInt(url.searchParams.get('limit') || '7', 10); // Default to 7 projects per page

  const offset = (page - 1) * limit; // Calculate the offset for pagination

  try {
    // Fetch the paginated projects from the database
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT * FROM projects LIMIT ? OFFSET ?",
      [limit, offset]
    );

    // Log the rows fetched from the database
    console.log("Fetched rows from DB:", rows);

    // Map rows to match the Project type and handle invalid prices
    const projects: Project[] = rows.map((row) => ({
      id: row.id,
      name: row.title,
      price: parseFloat(row.price), // Ensure price is parsed to a number
      status: row.status,
      describe_project: row.describe_project,
      created_at: row.created_at,
      updated_at: row.updated_at,
    }));

    // Get the total number of projects to calculate total pages
    const [[totalProjects]] = await db.query<RowDataPacket[]>("SELECT COUNT(*) AS count FROM projects");
    const totalPages = Math.ceil(totalProjects.count / limit);

    // Return the projects along with the total pages information
    return NextResponse.json(projects, {
      headers: {
        "X-Total-Pages": totalPages.toString(), // Add total pages in response header
        "X-Total-Projects": totalProjects.count.toString(), // Include total project count
      },
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { message: "Error retrieving projects" },
      { status: 500 }
    );
  }
}
// Update Project Status
export async function PUT(req: Request) {
  try {
    const { id, status }: UpdateProjectPayload = await req.json();
    console.log("Received payload:", { id, status });

    if (!id || !status) {
      return NextResponse.json(
        { message: "Invalid data. ID and status are required." },
        { status: 400 }
      );
    }

    // Ensure ID is numeric
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      return NextResponse.json(
        { message: "Invalid ID format." },
        { status: 400 }
      );
    }

    // Log to debug if the query is working as expected
    console.log("Updating project with ID:", numericId, "and status:", status);

    const [result]: [OkPacket, any] = await db.query(
      "UPDATE projects SET status = ? WHERE id = ?",
      [status, numericId]
    );

    console.log("Update result:", result);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "No project found with the given ID." },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Project status updated successfully." });
  } catch (error: unknown) {
    // Type guard to narrow 'error' to an 'Error' type
    if (error instanceof Error) {
      console.error("Error updating project:", error.message);
      return NextResponse.json(
        { message: `Error updating project status: ${error.message}` },
        { status: 500 }
      );
    } else {
      console.error("Unknown error:", error);
      return NextResponse.json(
        { message: "Unknown error occurred." },
        { status: 500 }
      );
    }
  }
}
