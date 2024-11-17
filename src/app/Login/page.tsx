"use client";
import Image from "next/image";
import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useContext } from "react";
import Context from "../../../ContextAPI";
import { toast } from "react-toastify";
import Loader from "@/components/Loader";
const Login = () => {
  const [Loading, setLoading] = useState<boolean>(false);
  const { data: session } = useSession();
  async function HandleSubmit(Event: React.FormEvent<HTMLFormElement>) {
    Event.preventDefault();
    setLoading(true);
    const email = (Event.currentTarget.email as HTMLInputElement).value;
    const password = (Event.currentTarget.password as HTMLInputElement).value;
    let Response = await fetch("/api/MyAuth/LoginUser", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    Response = await Response.json();
    interface ResponseType extends Response {
      success: boolean;
      token: string | undefined | null;
      error: string | undefined | null;
      message: string | undefined | null;
    }
    const MyResponse = Response as ResponseType;
    if (MyResponse.success) {
      localStorage.setItem("JWT_TOKEN", String(MyResponse.token));
      window.location.href = "/";
    } else {
      toast.error(MyResponse.error, {
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
  const { User } = useContext(Context);
  if (session || User) {
    redirect("/Generate");
  }
  return (
    <div className="md:p-0 p-5">
      <div className="flex justify-center items-center flex-col md:min-h-[100vh] min-h-[80vh]">
        <div className="mx-auto shadow-lg shadow-gray-700 rounded-lg border border-opacity-20 border-white min-w-96 px-16 py-12">
          <h1 className="text-2xl font-bold text-center mb-5">
            Login with Shortify
          </h1>
          <form onSubmit={HandleSubmit} className="flex flex-col gap-5">
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
              href={"/Register"}
              className="md:text-right text-center hover:underline"
            >
              Don&apos;t have an account?
            </Link>
            {!Loading && (
              <button
                type="submit"
                className="p-3 bg-slate-900 text-white rounded-lg font-bold"
              >
                Login
              </button>
            )}
          </form>

          <button
            onClick={() => {
              setLoading(true);
              signIn("google");
            }}
            className="my-5 flex gap-3 justify-center items-center p-3 bg-slate-900 text-white rounded-lg font-bold w-full"
          >
            {Loading ? (
              <Loader />
            ) : (
              <>
                {" "}
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

export default Login;
