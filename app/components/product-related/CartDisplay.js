import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import Title from "../Title";
import CartList from "./CartList";

export default function CartDisplay() {
  const [initialCart, setInitialCart] = useState([]);
  const [cart, setCart] = useState(initialCart);
  const supabase = createClient();

  useEffect(() => {
    getCart();
  }, []);
  useEffect(() => {
    updateCart();
  }, [initialCart]);

  async function getCart() {
    try {
      const { data } = await supabase.from("cart_items").select();
      setInitialCart(data || []);
    } catch (error) {
      console.error("unable to get items", error);
    }
  }
  function updateCart() {
    setCart(initialCart);
  }
  // console.log(initialCart);

  return (
    <section className="flex flex-col bg-backDropPink mt-12">
      <h2 className="text-4xl p-6 text-center"> Cart </h2>

      <CartList cartData={cart} />
    </section>
  );
}
