import React from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <header className="m-3 p-3 max-w-[100%] md:mx-96 bg-slate-900 rounded-lg backdrop-blur-lg sticky top-5">
      <nav className="flex items-center justify-around">
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
          <Link className="hover:underline" href="/">
            Home
          </Link>
          <Link className="hover:underline" href="/about">
            About
          </Link>
          <Link className="hover:underline" href="/contact">
            Contact
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
