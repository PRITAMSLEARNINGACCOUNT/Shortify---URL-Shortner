"use client";

import { useEffect, useState } from "react";
import { UpdatePlan } from "../server/UpdatePlan";
import Loader from "@/components/Loader";

const CapturePage = (path: { params: Promise<{ Capture: string }> }) => {
  const [Loading, setLoading] = useState<boolean>(true);
  async function Redirect() {
    const ShortURL = await path.params;
    window.location.href = await UpdatePlan(ShortURL.Capture);
  }
  useEffect(() => {
    Redirect().then(() => setLoading(false));
  }, []);
  return (
    <>
      <div className="min-h-[80vh] flex justify-center items-center">
        {Loading ? <Loader /> : null}
      </div>
    </>
  );
};

export default CapturePage;
