// pages/success.js
"use client";
import { Suspense, useEffect, useState } from "react";

import { clearCart, getServerSideProps } from "./actions";
import { useSearchParams } from "next/navigation";
import OrderSummary from "../components/product-related/OrderSummary";
import { createClient } from "@/utils/supabase/client";

// change loading to a skeleton later.
export function Loading() {
  return <p> Loading Order details...</p>;
}

export function SuccessContent({ stripeSession }) {
  // useSearchParams for query similar urls.
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const supabase = createClient();

  useEffect(() => {
    sessionFunction();
    getUser();
  }, []);

  // TODO: work on clearing cart and uploading data tomorrow. The problem is on orders
  // TODO: orderupload is where its getting stuck. consider checking if the id im putting in is a valid uuid perhaps.
  useEffect(() => {
    if (session) {
      if (session.paymentStatus === "paid") {
        // clearCart(session);
        // handleOrderUpload(session);
        // setErrMsg("");
      } else {
        setErrMsg("There was Something Strange With Payment!!");
      }
    } else {
      setErrMsg("error loading data");
    }
  }, [session]);

  // get user data
  async function getUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user);
  }

  // get session data.
  const sessionFunction = async () => {
    try {
      const stripeData = await getServerSideProps(sessionId);
      setSession(stripeData.stripeSession);
      setLoading(false);
    } catch (error) {
      console.log("error loading data");
      setErrMsg("error loading data");
    }
  };
  // clear database cart
  async function clearCart(session) {
    const { data, error } = await (await supabase)
      .from("cart_items")
      .delete()
      .match({
        user_id: user.id,
        product_id: session.product_id,
      });
    console.log(`cart cleared`);
    if (error) {
      console.error("data unable to delete.");
    }
  }
  // database submit.
  async function handleOrderUpload(session) {
    try {
      // const address = await addressUpload(session);
      const orderId = await orderUpload(session);

      // const orderItems = await orderItemsUpload(orderId);

      console.log(`order processed! : `, { orderId, orderItems });
    } catch (error) {
      console.error("error processing order: ", error);
    }
  }

  async function addressUpload(session) {
    const address = session.customerDetails.address;
    const { data, error } = await supabase
      .from("addresses")
      .insert([
        {
          user_id: user.id,
          address_line_1: address.line1,
          address_line_2: address.line2 || null,
          city: address.city,
          state_province: address.state || address.province,
          zip_postal: address.postal_code || address.postal_code,
          country: address.country,
        },
      ])
      .select();
    console.log("successful address upload");
    if (error) {
      console.error("unable to upload address", error);
    }
    return data;
  }

  async function orderUpload(session) {
    const number = session.amountTotal / 100;
    const totalPrice = number.toFixed(2);
    const { data, error } = await supabase
      .from("orders")
      .insert([
        {
          user_id: user.id,
          total_price: totalPrice,
          status: "Awaiting Delivery",
        },
      ])
      .select();

    if (error) {
      setErrMsg("unable to upload to orders");
    }
    if (data && data.length > 0) {
      console.log("successful orders upload");
      console.log(data[0].id);
      return data[0].id;
    } else {
      throw new Error("Order upload failed. No data returned.");
    }
  }
  async function orderItemsUpload(orderId) {
    const lineItems = session.lineItems.data.map((product) => ({
      order_id,
      product_id: product.id,
      product_name: product.name,
      quantity: product.quantity,
      price_per_unit: product.price,
    }));

    const { data, error } = await supabase
      .from("order_items")
      .insert(lineItems)
      .select();

    console.log("successful order items upload");
    if (error) {
      console.log("unable to upload to order_items", error);

      return data;
    }
  }

  return (
    <div>
      <h1>Payment Completed!</h1>
      {!loading && <OrderSummary session={session} />}
    </div>
  );
}

export default function Success(stripeSession) {
  return (
    <Suspense fallback={<Loading />}>
      <SuccessContent stripeSession={stripeSession} />
    </Suspense>
  );
}
