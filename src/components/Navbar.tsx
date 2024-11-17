"use client";
import { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { LogIn, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Context from "../../ContextAPI";
import { redirect } from "next/navigation";
const Navbar = () => {
  const { User } = useContext(Context);
  const { data: session } = useSession();
  function HandleLogout() {
    if (session) {
      signOut();
    } else {
      localStorage.removeItem("JWT_TOKEN");
      window.location.href = "/";
    }
  }
  return (
    <header className="m-3 px-8 py-3 md:w-[35vw] w-[90vw] container mx-auto bg-slate-900 rounded-full backdrop-blur-lg sticky top-5">
      <nav className="flex items-center justify-between">
        <Link href={"/"}>
          <Image
            src="/ShortifyLogo.jpg"
            alt="ShortifyLogo"
            width={70}
            height={70}
            className="rounded-full"
          />
        </Link>
        <ul className="flex gap-3 font-bold text-lg">
          <Image
            onClick={() => {
              redirect("/Vip");
            }}
            src={"/Vip.png"}
            width={53}
            height={53}
            alt="Upgrade To VIP"
            className="rounded-full border border-gray-700 hover:bg-gray-700 flex items-center cursor-pointer"
          />
          <button className="p-3 rounded-full border border-gray-700 hover:bg-gray-700 flex items-center gap-2">
            {session || User ? (
              <LogOut onClick={HandleLogout} size={25} />
            ) : (
              <LogIn
                onClick={() => {
                  redirect("/Login");
                }}
                size={25}
              />
            )}
          </button>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
