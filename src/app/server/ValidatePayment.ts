"use server";
import { PaymentResponse } from "@/lib/Interfaces";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";

export async function verifyPaymentSignature(response: PaymentResponse) {
  const secret: string = String(process.env.RAZORPAY_KEY_SECRET); // Replace with your Razorpay Key Secret

  return validatePaymentVerification(
    {
      subscription_id: response.razorpay_subscription_id,
      payment_id: response.razorpay_payment_id,
    },
    response.razorpay_signature,
    secret
  );
}
