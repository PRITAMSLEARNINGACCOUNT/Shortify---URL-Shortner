import { NextRequest, NextResponse } from "next/server";

export async function POST(Reuqest: NextRequest) {
  try {
    const { OriginalUrl } = await Reuqest.json();
    console.log(OriginalUrl);

    return Response.redirect(OriginalUrl, 307);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return NextResponse.redirect(String(process.env.NEXT_PUBLIC_HOST));
    }
  }
}
