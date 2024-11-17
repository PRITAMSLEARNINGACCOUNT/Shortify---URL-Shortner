"use client";

import { useContext, useEffect, useRef } from "react";
import Context from "../../ContextAPI";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Typed from "typed.js";

export default function Home() {
  const { User } = useContext(Context);
  const { data: session } = useSession();
  const typedRef = useRef(null);

  useEffect(() => {
    const options = {
      strings: [
        "Welcome To Shortify",
        "Shortify your URLs with ease",
        "Streamline your online experience",
        "Fast, reliable, and efficient",
        "A free plan awaits you",
      ],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true,
    };

    const typed = new Typed(typedRef.current, options);

    return () => {
      typed.destroy();
    };
  }, []);

  if (session || User) {
    redirect("/Generate");
  }

  return (
    <div className="min-h-[85vh] flex flex-col justify-center items-center">
      <h1 className="text-5xl text-center font-extrabold text-white drop-shadow-md">
        <span ref={typedRef}></span>
      </h1>
      <p className="text-lg text-center text-white mt-4 max-w-2xl drop-shadow-md">
        Shortify is an efficient and easy-to-use URL shortening service that
        streamlines your online experience.
      </p>
      <p className="text-lg text-center text-white mt-4 max-w-2xl drop-shadow-md">
        Sign up now to access our free plan and start shortening your URLs with
        ease. Enjoy up to 100 free URL shortens per month!
      </p>
      <button
        onClick={() => {
          redirect("/Register");
        }}
        className="mt-8 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
      >
        Get Started
      </button>
    </div>
  );
}
