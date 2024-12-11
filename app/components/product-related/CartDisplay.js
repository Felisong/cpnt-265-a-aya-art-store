import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import Title from "../Title";
import CartList from "./CartList";
import { redirect } from "next/dist/server/api-utils";

export default function CartDisplay(products) {
  const [initialCart, setInitialCart] = useState([]);
  const [cart, setCart] = useState(initialCart);
  const supabase = createClient();

  useEffect(() => {
    getCart();
  }, [cart]);
  useEffect(() => {
    updateCart();
  }, [initialCart]);

  async function getCart() {
    try {
      const { data } = await supabase
        .from("cart_items")
        .select()
        .order("id", { ascending: true });
      setInitialCart(data || []);
    } catch (error) {
      console.error("unable to get items", error);
    }
  }

  function updateCart() {
    setCart(initialCart);
  }

  return (
    <section className="flex flex-col mt-12 items-center">
      <h2 className="text-4xl p-6 text-center"> Cart </h2>

      <CartList cartData={cart} />
      <button
        onClick={(e) => {
          redirect("/checkout");
        }}
        className="bg-white p-2 rounded-full w-fit m-4 mb-2"
      >
        Go to Checkout.
      </button>
    </section>
  );
}
