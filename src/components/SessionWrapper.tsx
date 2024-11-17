"use client";
import { SessionProvider } from "next-auth/react";
import { ReactNode, useEffect, useState } from "react";
import Context from "../../ContextAPI";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserInterface, CustomResponse } from "@/lib/Interfaces";
export default function SessionWrapper({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [User, setUser] = useState<UserInterface | null>(null);
  async function GetUserDetails() {
    const JWT_TOKEN = localStorage.getItem("JWT_TOKEN")
      ? localStorage.getItem("JWT_TOKEN")
      : null;
    if (JWT_TOKEN) {
      let Response = await fetch("api/MyAuth/GetUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: JWT_TOKEN }),
      });
      Response = await Response.json();
      const MyCustomResponse = Response as CustomResponse;
      if (MyCustomResponse.success) {
        // console.log(MyCustomResponse.User);

        setUser(MyCustomResponse.User as UserInterface);
      } else {
        setUser(null);
      }
    }
  }
  useEffect(() => {
    GetUserDetails();
  }, []);

  return (
    <SessionProvider>
      <Context.Provider
        value={{
          User,
        }}
      >
        {children}
        <ToastContainer />
      </Context.Provider>
    </SessionProvider>
  );
}
