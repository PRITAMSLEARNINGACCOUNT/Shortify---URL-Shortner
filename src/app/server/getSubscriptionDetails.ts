"use server";

import Razorpay from "razorpay";
export const SubscriptionID = async (PLAN: string) => {
  const instance = new Razorpay({
    key_id: String(process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID),
    key_secret: String(process.env.RAZORPAY_KEY_SECRET),
  });

  const Response = await instance.subscriptions.create({
    plan_id:
      PLAN === "VIP"
        ? String(process.env.VIP_PLAN)
        : String(process.env.PREMIUM_PLAN),
    customer_notify: 1,
    total_count: 12,
  });

  return Response.id;
};
