import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import Title from "../Title";
import CartList from "./CartList";
import { redirect } from "next/dist/server/api-utils";
import { Loading } from "@/app/success/page";
import CircularLoading from "./CircularLoading";

const supabase = createClient();

export default function CartDisplay() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCart();

    const subscription = supabase
      .channel("cart_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "cart_items" },
        handleCartChange
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function getCart() {
    try {
      const { data } = await supabase
        .from("cart_items")
        .select()
        .order("id", { ascending: true });
      setCart(data || []);
      setLoading(false);
    } catch (error) {
      console.error("unable to get items", error);
      setLoading(false);
    }
  }

  function handleCartChange(payload) {
    // console.log("change received: ", payload);
    getCart();
  }

  // TODO: if products doesnt update, do this method to get real time updates, check the payload, and get cart like so to then compare with the cart inside if it exists or not.
  // if id !== id shenanigan

  if (loading) {
    return (
      <div className="p-4">
        {" "}
        <CircularLoading />
        <Loading />
      </div>
    );
  } else {
    return (
      <section className="flex flex-col mt-12 items-center">
        <h2 className="text-4xl p-6 text-center"> Cart </h2>

        <CartList cartData={cart} />
      </section>
    );
  }
}
