import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const usersFilePath = path.join(process.cwd(), "users.json");

export async function GET() {
  try {
    if (!fs.existsSync(usersFilePath)) {
      return NextResponse.json({ users: [] }, { status: 200 });
    }

    const users = JSON.parse(fs.readFileSync(usersFilePath, "utf8"));
    
    // omit passwords for security
    const safeUsers = users.map((u: any) => ({
      id: u.id,
      name: u.name,
      email: u.email
    }));

    return NextResponse.json({ users: safeUsers }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
