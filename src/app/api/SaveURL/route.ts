import { NextRequest, NextResponse } from "next/server";
import Links from "@/model/Links";
import { connectDB } from "@/lib/ConnectMongo";
import { Types } from "mongoose";
import User from "@/model/User";
export async function POST(Request: NextRequest) {
  try {
    await connectDB();
    const { OriginalUrl, ShortUrl, UserID } = await Request.json();
    const FindLink = await Links.findOne({ ShortUrl });
    if (FindLink) {
      throw new Error("Short URL already exists");
    }
    await Links.create({
      OriginalUrl,
      ShortUrl,
      UserID: new Types.ObjectId(UserID),
    });
    await User.findByIdAndUpdate(UserID, { $inc: { NoOfLinksGenerated: 1 } });
    return NextResponse.json(
      { message: "URL saved successfully", success: true },
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
