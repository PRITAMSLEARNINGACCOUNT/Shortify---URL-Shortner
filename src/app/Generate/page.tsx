"use client";
import { ArrowRight, BookCopy } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Typed from "typed.js";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Context from "../../../ContextAPI";
import { useContext } from "react";
import { toast } from "react-toastify";
import Loader from "@/components/Loader";
import { LinkInterface, UserInterface, CustomResponse } from "@/lib/Interfaces";
export default function Generate() {
  const [Loading, setLoading] = useState<boolean>(true);
  const [MyUser, setMyUser] = useState<UserInterface | null>(null);
  const { data: session } = useSession();
  const { User } = useContext(Context);
  const Reference = useRef<HTMLInputElement | null>(null);
  const [Links, setLinks] = useState<Array<LinkInterface> | null | undefined>(
    null
  );
  const [MainLink, setMainLink] = useState<string>("");
  async function GetLinks(UserID: string) {
    let Response = await fetch("api/GetURLs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ID: UserID }),
    });
    Response = await Response.json();
    const MyCustomResponse = Response as CustomResponse;
    if (MyCustomResponse.success) {
      setLinks(MyCustomResponse.Links);
    }
  }
  async function GetUserDetails() {
    // console.log(session?.user as UserInterface);
    // console.log(!User);

    if (!User) {
      setMyUser(session?.user as UserInterface);
    } else {
      setMyUser(User);
    }
  }
  useEffect(() => {
    GetUserDetails();
  }, []);
  useEffect(() => {
    if (MyUser?._id) {
      console.log(MyUser?._id);

      GetLinks(String(MyUser?._id)).then(() => {
        setLoading(false);
      });
    }
  }, [MyUser]);

  async function HandleLink() {
    if (MainLink.length === 0 || !MainLink.includes("http")) {
      toast.error("Please Enter A Valid URL!!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    } else {
      if (MyUser?.NoOfLinksGenerated === 50 && MyUser?.Plan === "Free") {
        toast.error("Limit Exhausted!! - Subscribe To VIP Now", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        redirect("/Vip");
      } else if (MyUser?.NoOfLinksGenerated === 500 && MyUser?.Plan === "Vip") {
        toast.error("Limit Exhausted!! - Subscribe To Premium Now", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        redirect("/Vip");
      }
      let MyString: string | undefined = "";
      for (let index = 0; index < 10; index++) {
        const randomChar = String.fromCharCode(
          65 + Math.floor(Math.random() * 26)
        );
        MyString += randomChar;
      }
      MyString = MyString.toLowerCase();
      let HOST: string = String(process.env.NEXT_PUBLIC_HOST);
      HOST += "/";
      HOST += MyString;
      const MyData = {
        OriginalUrl: MainLink,
        ShortUrl: HOST,
        UserID: MyUser?._id,
      };
      let SaveURLResponse = await fetch("api/SaveURL", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(MyData),
      });
      SaveURLResponse = await SaveURLResponse.json();
      const MySaveURLResponse = SaveURLResponse as CustomResponse;
      if (MySaveURLResponse.success) {
        await GetLinks(String(MyUser?._id));
        toast.success("URL Shortified Successfully!!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        toast.error(MySaveURLResponse.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
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
      if (typed) {
        typed.destroy();
      }
    };
  }, []);
  if (!session && !User) {
    redirect("/Login");
  }
  return (
    <div className="min-h-[80vh] flex justify-center items-center">
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl text-center font-bold">
          Welcome To Shortify {MyUser?.name}
        </h1>
        <p className="text-lg text-center">
          Shortify is an efficient and easy-to-use URL shortening sercive that
          streamlines your online experience.
        </p>
        <div className="flex items-center justify-center gap-3">
          <input
            type="text"
            value={MainLink}
            onChange={(e) => setMainLink(e.target.value)}
            className="bg-slate-950 p-3 rounded-lg text-white md:w-[40vw] border border-gray-600"
            ref={Reference}
          />
          <div
            className="bg-blue-950 p-4 rounded-full cursor-pointer"
            onClick={HandleLink}
          >
            <ArrowRight />
          </div>
        </div>
        {Loading ? (
          <div className="flex justify-center">
            <Loader />
          </div>
        ) : (
          <div className="md:p-0 p-10 overflow-x-auto">
            <h1 className="text-2xl font-bold mb-5 text-center underline">
              Generated Links
            </h1>
            {Links === null && (
              <p className="text-xl text-center">
                No Generated Links Founded,Start Generating Now
              </p>
            )}
            {Number(Links?.length) > 0 && (
              <div className="overflow-x-auto max-w-[80vw]">
                <table className="text-center border rounded-lg border-opacity-25 border-white min-w-full">
                  <thead>
                    <tr>
                      <th className="border border-white border-opacity-25 p-2">
                        Short Link
                      </th>
                      <th className="border border-white border-opacity-25 p-2">
                        Original Link
                      </th>
                      <th className="border border-white border-opacity-25 p-2">
                        Visits
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Links?.map((link, index) => {
                      return (
                        <tr key={index}>
                          <td className="border border-white border-opacity-25 p-2">
                            <div className="flex justify-center items-center gap-3">
                              <Link href={link.ShortUrl}>{link.ShortUrl}</Link>
                              <BookCopy
                                className="cursor-pointer"
                                onClick={() => {
                                  navigator.clipboard.writeText(link.ShortUrl);
                                }}
                              />
                            </div>
                          </td>
                          <td className="border border-white border-opacity-25 p-2">
                            <div className="flex justify-center items-center gap-3">
                              <Link href={link.OriginalUrl}>
                                {link.OriginalUrl}
                              </Link>
                              <BookCopy
                                className="cursor-pointer"
                                onClick={() => {
                                  navigator.clipboard.writeText(
                                    link.OriginalUrl
                                  );
                                }}
                              />
                            </div>
                          </td>
                          <td className="border border-white border-opacity-25 p-2">
                            {link.Clicks}{" "}
                            {link.Clicks >= 1000 && MyUser?.Plan === "Free"
                              ? "(Limit Exhausted)"
                              : link.Clicks >= 10000 && MyUser?.Plan === "Vip"
                              ? "(Limit Exhausted)"
                              : null}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
