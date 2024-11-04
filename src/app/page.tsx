"use client";
import { ArrowRight, BookCopy, SquareArrowOutUpRight } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Typed from "typed.js";
export default function Home() {
  const Reference = useRef<HTMLInputElement | null>(null);
  const [GeneratedLink, setGeneratedLink] = useState<string | null>(null);
  const [MainLink, setMainLink] = useState<string>("");
  async function HandleLink() {
    if (MainLink.length === 0 || !MainLink.includes("http")) {
      alert("Please Enter a Valid URL");
      return;
    } else {
      let MyString: string | undefined = "";
      for (let index = 0; index < 10; index++) {
        MyString = MyString.at(Math.random() * 90 - 30);
      }
    }
  }
  useEffect(() => {
    let typed: Typed | undefined;
    if (Reference.current) {
      typed = new Typed(Reference.current, {
        strings: [
          "Shorten Your Link",
          "Paste Your Long URL",
          "Get a Short Link",
          "Transform Your URLs",
          "Make Your URL Short",
          "Enter Your URL Here",
        ],
        typeSpeed: 50,
        loop: true,
        backSpeed: 50,
        attr: "placeholder",
      });
    }

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      if (typed) {
        typed.destroy();
      }
    };
    // console.log(Reference.current?.value);
  }, []);

  return (
    <div className="min-h-[80vh] flex justify-center items-center">
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl text-center font-bold">Welcome To Shortify</h1>
        <p className="text-lg text-center">
          Shortify is an efficient and easy-to-use URL shortening sercive that
          streamlines your online experience.
        </p>
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={MainLink}
            onChange={(e) => setMainLink(e.target.value)}
            className="bg-slate-950 p-3 rounded-lg text-white w-[40vw] border border-gray-600"
            ref={Reference}
          />
          <div
            className="bg-blue-950 p-4 rounded-full cursor-pointer"
            onClick={HandleLink}
          >
            <ArrowRight />
          </div>
        </div>
        {GeneratedLink && (
          <div className="flex items-center flex-col gap-3 my-3">
            <h2 className="text-xl font-bold">Your Link : -</h2>
            <p className="text-lg flex justify-center items-center gap-3">
              <input
                disabled
                type="text"
                value={GeneratedLink}
                className="md:w-[30vw]  text-blue-500 disabled:bg-slate-700 p-3 rounded-lg border border-gray-600"
              />
              <Link target="_blank" href={GeneratedLink}>
                <SquareArrowOutUpRight />
              </Link>
              <BookCopy
                className="cursor-pointer"
                onClick={() => {
                  navigator.clipboard.writeText(GeneratedLink);
                }}
              />
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
