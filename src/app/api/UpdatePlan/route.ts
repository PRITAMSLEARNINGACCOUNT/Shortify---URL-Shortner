import { connectDB } from "@/lib/ConnectMongo";
import User from "@/model/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(Request: NextRequest) {
  try {
    await connectDB();
    const { Plan, UserID } = await Request.json();
    await User.findOneAndUpdate({ _id: UserID }, { Plan: Plan }, { new: true });
    return NextResponse.json({ success: true });
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
