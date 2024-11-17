import { connectDB } from "@/lib/ConnectMongo";
import User from "@/model/User";
import { NextRequest, NextResponse } from "next/server";
import JWT from "jsonwebtoken";
import bcrypt from "bcrypt";
export async function POST(Request: NextRequest) {
  try {
    await connectDB();
    const RBody = await Request.json();
    const UserInfo = JSON.parse(
      JSON.stringify(await User.findOne({ email: RBody.email }))
    );
    if (UserInfo.length !== 0) {
      const PassCheck = bcrypt.compareSync(RBody.password, UserInfo.password);
      if (PassCheck) {
        const JWT_Token = JWT.sign(
          {
            _id: UserInfo._id,
            name: UserInfo.name,
            username: UserInfo.username,
            NoOfLinksGenerated: UserInfo.NoOfLinksGenerated,
            Plan: UserInfo.Plan,
          },
          String(process.env.JWT_SECRET),
          { expiresIn: "1d" }
        );
        return NextResponse.json(
          {
            success: true,
            token: JWT_Token,
            message: "User logged in successfully",
          },
          { status: 200 }
        );
      }
      throw new Error("Invalid password");
    }

    throw new Error("User not found");
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Internal Server Error", success: false },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "An unknown error occurred", success: false },
      { status: 500 }
    );
  }
}
