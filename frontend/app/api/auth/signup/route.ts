import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const usersFilePath = path.join(process.cwd(), "users.json");

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // Initialize Mock DB
    if (!fs.existsSync(usersFilePath)) {
      fs.writeFileSync(usersFilePath, JSON.stringify([]));
    }

    const users = JSON.parse(fs.readFileSync(usersFilePath, "utf8"));

    // Check if user exists
    if (users.find((u: any) => u.email === email)) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    const newUser = { id: Date.now().toString(), name, email, password };
    users.push(newUser);
    
    // Save to Database
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

    return NextResponse.json({ message: "User created successfully", user: { id: newUser.id, name, email } }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
