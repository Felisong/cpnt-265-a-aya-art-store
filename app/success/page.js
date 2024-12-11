// pages/success.js
"use client";
import { Suspense, useEffect, useState } from "react";

import { getServerSideProps } from "./actions";
import { useSearchParams } from "next/navigation";
import OrderSummary from "../components/product-related/OrderSummary";

export function Loading() {
  return <p> Loading Order details...</p>;
}

export function SuccessContent({ stripeSession }) {
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
      {!loading && <OrderSummary session={session} />}
    </div>
  );
}

export default function Success() {
  return (
    <Suspense fallback={<Loading />}>
      <SuccessContent />
    </Suspense>
  );
}
