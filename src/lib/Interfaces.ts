export interface UserInterface {
  _id: string;
  username: string;
  NoOfLinksGenerated: number;
  Plan: string;
  name: string;
}
export interface LinkInterface {
  Clicks: number;
  OriginalUrl: string;
  ShortUrl: string;
}
export interface CustomResponse extends Response {
  User: UserInterface | null;
  success: boolean;
  error: string | null | undefined;

  Links: Array<LinkInterface> | null | undefined;
}

export interface PaymentResponse {
  razorpay_payment_id: string;
  razorpay_subscription_id: string;
  razorpay_signature: string;
}
