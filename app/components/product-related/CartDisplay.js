import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import Title from "../Title";
import CartList from "./CartList";

export default function CartDisplay(products) {
  const [initialCart, setInitialCart] = useState([]);
  const [cart, setCart] = useState(initialCart);
  const supabase = createClient();

  // find time for the array to update when i add or disadd to the database. like i do in the cards
  useEffect(() => {
    setInterval(() => {
      getCart();
    }, 1000);
  }, []);
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
  // console.log(`initial cart: `, initialCart);
  // console.log(`real cart: `, cart);

  return (
    <section className="flex flex-col bg-backDropPink mt-12">
      <h2 className="text-4xl p-6 text-center"> Cart </h2>

      <CartList cartData={cart} />
      <button> Go to Checkout. </button>
    </section>
  );
}
