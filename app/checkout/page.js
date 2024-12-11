"use client";
import { createClient } from "@/utils/supabase/client";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import CartDisplay from "../components/product-related/CartDisplay";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productError, setProductError] = useState("");
  const [userError, setUserError] = useState("");
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const supabase = createClient();
  const isReady = Boolean(user && cart);

  //  pull from the database on load.
  useEffect(() => {
    getProducts();
    getUser();
  }, []);

  useEffect(() => {
    if (user && cart.length > 0) {
      filterCart();
    } else if (user && cart.length === 0) {
      setProductError("no items in card to show.");
    }
  }, [user, cart]);
  // use effect after products and user is loaded.
  async function getProducts() {
    try {
      const { data } = await supabase.from("cart_items").select();
      setCart(data);
      setProductError("");
    } catch (error) {
      console.error(error);
      alert("could not load products.");
      setProductError("could not load products.");
    }
  }
  async function getUser() {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
      console.log("not logged in");
    } else {
      setUser(data.user);
    }
  }

  function filterCart() {
    const userProducts = cart.filter((product) => product.user_id === user.id);
    if (userProducts.length > 0) {
      setProducts(userProducts);
      setProductError("");
    } else {
    }
  }

  const handleCheckout = async () => {
    const stripe = await stripePromise;
    console.log(products);
    const response = await fetch("/api/checkout-sessions/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // here i will push my database items instead
      body: JSON.stringify({
        cartItems: products,
        returnUrl: window.location.origin,
        userId: products.user_id,
      }),
    });

    const { sessionId } = await response.json();
    // console.log(products);

    await stripe.redirectToCheckout({ sessionId });
  };

  return (
    <div>
      <div className="bg-backDropPink p-20">
        <CartDisplay />
        <button onClick={handleCheckout}>Proceed to Checkout</button>
      </div>
    </div>
  );
}
