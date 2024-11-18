"use server";
import { connectDB } from "@/lib/ConnectMongo";
import Links from "@/model/Links";
import User from "@/model/User";

export async function UpdatePlan(Capture: string): Promise<string> {
  try {
    await connectDB();

    const Link = await Links.findOne({
      ShortUrl: `${process.env.NEXT_PUBLIC_HOST}/${Capture}`,
    });

    if (Link) {
      const MyUser = await User.findOne({ _id: Link.UserID });
      if (MyUser.Plan === "Free" && Link.Clicks === 1000) {
        return String(process.env.NEXT_PUBLIC_HOST);
      } else if (MyUser.Plan === "Vip" && Link.Clicks === 10000) {
        return String(process.env.NEXT_PUBLIC_HOST);
      }

      await Links.findByIdAndUpdate(Link._id, {
        $inc: { Clicks: 1 },
      });
      return Link.OriginalUrl;
    }
    return String(process.env.NEXT_PUBLIC_HOST);
  } catch (error) {
    console.log(error);

    console.log("Error Occured");

    if (error instanceof Error) {
      return String(process.env.NEXT_PUBLIC_HOST);
    }
    return String(process.env.NEXT_PUBLIC_HOST);
  }
}
