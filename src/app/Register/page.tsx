"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { useContext } from "react";
import Context from "../../../ContextAPI";
import Loader from "@/components/Loader";
import { toast } from "react-toastify";
const Register = () => {
  const [Loading, setLoading] = useState<boolean>(false);
  const { JWT_TOKEN } = useContext(Context);
  const { data: session } = useSession();
  async function HandleSubmit(Event: React.FormEvent<HTMLFormElement>) {
    Event.preventDefault();
    setLoading(true);
    const email = (Event.currentTarget.email as HTMLInputElement).value;
    const password = (Event.currentTarget.password as HTMLInputElement).value;
    const name = (Event.currentTarget.MyName as HTMLInputElement).value;
    const username = (Event.currentTarget.username as HTMLInputElement).value;
    let ResponseData = await fetch("api/MyAuth/Register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name, username }),
    });
    ResponseData = await ResponseData.json();
    interface ResponseType extends Response {
      success: boolean;
      error: string | undefined | null;
      message: string | undefined | null;
    }
    const MyResponseData = ResponseData as ResponseType;
    if (MyResponseData.success) {
      redirect("/Login");
    } else {
      toast.error(MyResponseData.error, {
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
  if (session || JWT_TOKEN) {
    redirect("/Generate");
  }
  return (
    <div className="md:p-0 p-5">
      <div className="flex justify-center items-center flex-col min-h-[100vh]">
        <div className="mx-auto shadow-lg shadow-gray-700 rounded-lg border border-opacity-20 border-white min-w-72 px-16 py-12">
          <h1 className="text-2xl font-bold text-center mb-5">
            Create an account with Shortify
          </h1>
          <form onSubmit={HandleSubmit} className="flex flex-col gap-5">
            <label htmlFor="MyName" className="text-center text-lg">
              Name
            </label>
            <input
              type="MyName"
              id="MyName"
              name="MyName"
              className="bg-slate-950 p-3   rounded-lg text-white border border-gray-600"
              placeholder="Please Enter Your Name"
              required
            />
            <label htmlFor="email" className="text-center text-lg">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="bg-slate-950 p-3   rounded-lg text-white border border-gray-600"
              placeholder="Please Enter Your Email"
              required
            />
            <label htmlFor="username" className="text-center text-lg">
              Username
            </label>
            <input
              type="username"
              id="username"
              name="username"
              className="bg-slate-950 p-3   rounded-lg text-white border border-gray-600"
              placeholder="Plase Enter Your Username"
              required
            />

            <label htmlFor="password" className="text-center text-lg">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="bg-slate-950 p-3  rounded-lg text-white border border-gray-600"
              placeholder="Please Enter Your Password"
            />
            <Link
              href={"/Login"}
              className="md:text-right text-center hover:underline "
            >
              Already Have An Account ?
            </Link>
            {!Loading && (
              <button
                type="submit"
                className="p-4 bg-slate-900 text-white rounded-lg font-bold"
              >
                Register With Shortify
              </button>
            )}
          </form>
          <button
            onClick={() => {
              setLoading(true);
              signIn("google");
            }}
            className="my-5 flex gap-3 justify-center items-center p-4 bg-slate-900 text-white rounded-lg font-bold w-full"
          >
            {Loading ? (
              <Loader />
            ) : (
              <>
                Login With Google{" "}
                <Image
                  src={"/GoogleLogo.png"}
                  width={30}
                  height={30}
                  alt="GoogleLogo"
                  className="rounded-full"
                />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
