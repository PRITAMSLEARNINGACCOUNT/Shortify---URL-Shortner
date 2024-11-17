import { connectDB } from "@/lib/ConnectMongo";
import User from "@/model/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
export async function POST(Request: NextRequest) {
  try {
    await connectDB();
    const { username, password, email, name } = await Request.json();
    await User.create({
      username,
      password: bcrypt.hashSync(password, 10),
      email,
      name,
    });
    return NextResponse.json(
      { success: true, message: "User created successfully" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message, success: false },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "An unknown error occurred", success: false },
      { status: 500 }
    );
  }
}
