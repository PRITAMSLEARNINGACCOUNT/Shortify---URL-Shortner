import { NextRequest, NextResponse } from "next/server";
import JWT from "jsonwebtoken";
// import { connectDB } from "@/lib/ConnectMongo";
// import User from "@/model/User";
export async function POST(Request: NextRequest) {
  try {
    const { token } = await Request.json();

    if (!token) {
      throw new Error("Nothing to verify");
    }
    // if (token) {
    const JWT_Payload = JWT.verify(token, String(process.env.JWT_SECRET));
    if (!JWT_Payload) {
      throw new Error("Invalid token");
    }
    return NextResponse.json(
      { success: true, User: JWT_Payload },
      { status: 200 }
    );
    // } else {
    //   await connectDB();
    //   const user = await User.findOne({ email });
    //   if (!user) {
    //     throw new Error("No user found");
    //   }
    //   return NextResponse.json(
    //     { success: true, User: JSON.parse(JSON.stringify(user)) },
    //     { status: 200 }
    //   );
    // }
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
