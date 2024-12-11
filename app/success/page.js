// pages/success.js
"use client";
import { Suspense, useEffect, useState } from "react";

import { getServerSideProps } from "./actions";
import { useSearchParams } from "next/navigation";
import OrderSummary from "../components/product-related/OrderSummary";

export function Loading() {
  return <p> Loading Order details...</p>;
}

export default function Success({ stripeSession }) {
  // useSearchParams for query similar urls.
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  const sessionFunction = async () => {
    const stripeData = await getServerSideProps(sessionId);
    setSession(stripeData);
    setLoading(false);
  };

  useEffect(() => {
    sessionFunction();
  }, []);

  return (
    <div>
      <h1>Payment Completed</h1>
      <Suspense fallback={<Loading />}>
        {!loading && <OrderSummary session={session} />}
      </Suspense>
    </div>
  );
}
