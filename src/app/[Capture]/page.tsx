"use server";
import { connectDB } from "@/lib/ConnectMongo";
import Links from "@/model/Links";
import User from "@/model/User";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
const CapturePage = async (path: { params: Promise<{ Capture: string }> }) => {
  const params = await path.params;
  try {
    await connectDB();

    const Link = await Links.findOne({
      ShortUrl: `${process.env.NEXT_PUBLIC_HOST}/${params.Capture}`,
    });

    if (Link) {
      const MyUser = await User.findOne({ _id: Link.UserID });
      if (MyUser.Plan === "Free" && Link.Clicks === 1000) {
        return redirect(String(process.env.NEXT_PUBLIC_HOST));
      } else if (MyUser.Plan === "Vip" && Link.Clicks === 10000) {
        return redirect(String(process.env.NEXT_PUBLIC_HOST));
      }

      await Links.findByIdAndUpdate(Link._id, {
        $inc: { Clicks: 1 },
      });
      console.log(Link.OriginalUrl);
      redirect(new URL(Link.OriginalUrl).toString());
    }
  } catch (error) {
    console.log(error);

    console.log("Error Occured");

    if (error instanceof Error) {
      return redirect(String(process.env.NEXT_PUBLIC_HOST));
    }
  }
};

export default CapturePage;
