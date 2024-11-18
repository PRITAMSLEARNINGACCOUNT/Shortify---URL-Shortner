"use client";

import { useContext, useEffect, useState } from "react";
import Context from "../../../ContextAPI";
import { signOut, useSession } from "next-auth/react";
import Script from "next/script";
import { PaymentResponse, UserInterface } from "@/lib/Interfaces";
import { SubscriptionID } from "../server/getSubscriptionDetails";
import { verifyPaymentSignature } from "../server/ValidatePayment";
import Loader from "@/components/Loader";
import { toast } from "react-toastify";
const Vip = () => {
  const [Loading, setLoading] = useState<boolean>(false);
  const [MyUser, setMyUser] = useState<UserInterface | null>(null);
  const { User } = useContext(Context);
  const { data: session } = useSession();
  async function HandlePayment(PlanName: string) {
    setLoading(true);
    try {
      const ID = await SubscriptionID(PlanName);
      const options = {
        key: String(process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID), // Razorpay API Key
        subscription_id: ID, // Subscription ID
        name: "Shortify - URL Shortening Service",
        description: `Upgrade to ${PlanName} Plan`,
        image: `${process.env.NEXT_PUBLIC_HOST}/ShortifyLogo.jpg`,
        handler: async function (response: PaymentResponse) {
          // console.log(response);
          if (await verifyPaymentSignature(response)) {
            await fetch("/api/UpdatePlan", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                Plan: PlanName,
                UserID: MyUser?._id,
              }),
            });
            toast.success("Payment Successful!Please Login Again", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            if (User) {
              localStorage.removeItem("JWT_TOKEN");
            } else {
              signOut();
            }
            window.location.href = `${process.env.NEXT_PUBLIC_HOST}/Login`;
          } else {
            toast.error("Payment Failed!", {
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
        },
        theme: {
          color: "#F37254",
        },
      };
      // @ts-expect-error : No Error Will Come
      const rzp1 = new Razorpay(options);
      rzp1.open();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, {
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
    if (User) {
      setMyUser(User);
    } else if (session?.user) {
      setMyUser(session?.user as UserInterface);
    }

    // console.log(User?.Plan);
  }, [User, session?.user]);

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <h1 className="text-center text-3xl font-bold underline pt-10">
        Subscribe with Shortify
      </h1>
      <p className="text-center mt-3 text-lg font-semibold">
        Upgrade to a VIP account to get more features
      </p>
      <div className="min-h-[65vh] flex flex-col justify-center">
        <div className="bg-gray-900 min-h-[50vh] border border-opacity-25 border-white md:mx-28 mx-8 rounded-lg shadow-lg shadow-gray-600 mt-10 md:mt-0">
          <div className="flex md:flex-row flex-col md:gap-10 gap-5 min-h-full md:p-20 p-5">
            <div className="card min-h-[35vh] border min-w-[25vw] rounded-lg border-opacity-25 border-white bg-slate-950 p-10">
              <div className="flex md:flex-row flex-col">
                <div className="Left md:min-w-[49%]">
                  <h1 className="text-3xl font-bold underline md:text-left text-center md:mb-0 mb-3">
                    Free Plan
                  </h1>
                </div>
                <div className="Right md:min-w-[49%]">
                  <h1 className="text-3xl font-bold md:text-right text-center">
                    0₹/Month
                  </h1>
                </div>
              </div>
              <div className="md:p-5 pl-3 text-lg mt-5">
                <ul className="list-disc">
                  <li>1000 Clicks Per Link</li>
                  <li>50 Links Generation</li>
                </ul>
              </div>
              <div className="flex justify-center mt-10">
                <button
                  disabled={
                    MyUser?.Plan === "Free" ||
                    MyUser?.Plan === "Free" ||
                    !MyUser
                  }
                  className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-lg font-semibold hover:from-pink-500 hover:to-purple-500 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50 disabled:text-gray-700"
                >
                  {Loading ? (
                    <Loader />
                  ) : MyUser?.Plan === "Free" || MyUser?.Plan === "Free" ? (
                    "Selected Plan"
                  ) : MyUser ? (
                    "Downgrade To Free"
                  ) : (
                    "Free Plan"
                  )}
                </button>
              </div>
            </div>
            <div className="card min-h-[35vh] border min-w-[25vw] rounded-lg border-opacity-25 border-white bg-slate-950 p-10">
              <div className="flex md:flex-row flex-col">
                <div className="Left md:min-w-[49%]">
                  <h1 className="text-3xl font-bold underline md:text-left text-center md:mb-0 mb-3">
                    Vip Plan
                  </h1>
                </div>
                <div className="Right md:min-w-[49%]">
                  <h1 className="text-3xl font-bold md:text-right text-center">
                    50₹/Month
                  </h1>
                </div>
              </div>
              <div className="md:p-5 pl-3 text-lg mt-5">
                <ul className="list-disc">
                  <li>10K Clicks Per Link</li>
                  <li>500 Links Generation</li>
                  <li>Customer Service Support</li>
                </ul>
              </div>
              <div className="flex justify-center mt-5">
                <button
                  disabled={
                    MyUser?.Plan === "VIP" || MyUser?.Plan === "VIP" || !MyUser
                  }
                  onClick={() => {
                    HandlePayment("VIP");
                  }}
                  className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-lg font-semibold hover:from-pink-500 hover:to-purple-500 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50 disabled:text-gray-700"
                >
                  {Loading ? (
                    <Loader />
                  ) : MyUser?.Plan === "VIP" || MyUser?.Plan === "VIP" ? (
                    "Selected Plan"
                  ) : (
                    "Upgrade To VIP"
                  )}
                </button>
              </div>
            </div>
            <div className="card min-h-[35vh] border min-w-[25vw] rounded-lg border-opacity-25 border-white bg-slate-950 p-10">
              <div className="flex md:flex-row flex-col">
                <div className="Left md:min-w-[49%]">
                  <h1 className="text-3xl font-bold underline md:text-left text-center md:mb-0 mb-3">
                    Premium Plan
                  </h1>
                </div>
                <div className="Right md:min-w-[49%]">
                  <h1 className="text-3xl font-bold md:text-right text-center">
                    100₹/Month
                  </h1>
                </div>
              </div>
              <div className="md:p-5 pl-3 text-lg mt-5">
                <ul className="list-disc">
                  <li>Unlimited Clicks Per Link</li>
                  <li>Unlimited Links Generation</li>
                  <li>Enhanced Customer Service Support</li>
                </ul>
              </div>
              <div className="flex justify-center mt-5">
                <button
                  disabled={
                    MyUser?.Plan === "Premium" ||
                    MyUser?.Plan === "Premium" ||
                    !MyUser
                  }
                  onClick={() => {
                    HandlePayment("Premium");
                  }}
                  className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-lg font-semibold hover:from-pink-500 hover:to-purple-500 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50 disabled:text-gray-700"
                >
                  {Loading ? (
                    <Loader />
                  ) : MyUser?.Plan === "Premium" ||
                    MyUser?.Plan === "Premium" ? (
                    "Selected Plan"
                  ) : (
                    "Upgrade To Premium"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Vip;
