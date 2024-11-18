import { NextRequest, NextResponse } from "next/server";

export async function POST(Reuqest: NextRequest) {
  const { OriginalUrl } = await Reuqest.json();
  return NextResponse.redirect(OriginalUrl);
}
