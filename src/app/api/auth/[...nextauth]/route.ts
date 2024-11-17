import NextAuth, { Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/lib/ConnectMongo";
import User from "../../../../model/User";
import bcrypt from "bcrypt";
const authOptions = NextAuth({
  providers: [
    GoogleProvider({
      clientId: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
    }),
  ],
  secret: process.env.NEXT_AUTH_SECRET,
  callbacks: {
    async session({ session }) {
      interface UserSession extends Session {
        user: {
          _id: string;
          name: string;
          email: string;
          username: string;
          NoOfLinksGenerated: number;
          Plan: string;
        };
      }
      const userSession = session as UserSession;
      await connectDB();
      const FindUser = await User.findOne({ email: session?.user?.email });
      const Randomstr: string =
        session?.user?.name +
        String(Math.floor(Math.random() * 1000) + Date.now());
      const saltRounds = 10;
      const HashedPassword = await bcrypt.hash(Randomstr, saltRounds);
      if (!FindUser) {
        if (userSession.user) {
          userSession.user.username = Randomstr.slice(0, -10);
          userSession.user.NoOfLinksGenerated = 0;
        }
        const U = await User.create({
          name: session?.user?.name,
          email: session?.user?.email,
          password: HashedPassword,
          username: Randomstr.slice(0, -10),
        });
        userSession.user._id = U._id;
        userSession.user.NoOfLinksGenerated = U.NoOfLinksGenerated;
        userSession.user.username = U.username;
        userSession.user.Plan = U.Plan;
        return session;
      }
      userSession.user._id = FindUser._id;
      userSession.user.NoOfLinksGenerated = FindUser.NoOfLinksGenerated;
      userSession.user.username = FindUser.username;
      userSession.user.Plan = FindUser.Plan;

      return session;
    },
  },
});

export { authOptions as GET, authOptions as POST };
