"use server";
import { connectDB } from "@/lib/ConnectMongo";
import { PathParams } from "@/lib/Interfaces";
import Links from "@/model/Links";
import User from "@/model/User";
import { redirect } from "next/navigation";

const CapturePage = async (path: PathParams): Promise<JSX.Element> => {
  await connectDB();

  const Link = await Links.findOne({
    ShortUrl: `${process.env.NEXT_PUBLIC_HOST}/${path.params.Capture}`,
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
    redirect(Link.OriginalUrl);
  }
  return redirect(String(process.env.NEXT_PUBLIC_HOST));
};

export default CapturePage;
