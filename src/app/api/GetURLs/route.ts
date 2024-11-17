import Links from "@/model/Links";
import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";
export async function POST(Request: NextRequest) {
  try {
    const { ID } = await Request.json();

    const GetLinks = await Links.find({ UserID: new Types.ObjectId(ID) });
    if (GetLinks.length > 0) {
      return NextResponse.json({ Links: GetLinks, success: true });
    }
    throw new Error("No links found");
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
