import { useEffect, useState } from "react";
import CircularLoading from "./CircularLoading";
import { create } from "domain";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export default function AddToCartBtn({ productData }) {
  // console.log(productData.id);

  const [isInCart, setIsInCart] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getCart();
    getUser();
    console.log("first hello");
    const subscription = supabase
      .channel("cart_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "cart_items" },
        (payload) => {
          console.log("hello?");
          handleCartChange(payload);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    setIsInCart(
      cartProducts.some((product) => product.product_id === productData.id)
    );
  }, [cartProducts, productData.id]);

  async function getCart() {
    try {
      const { data } = await supabase
        .from("cart_items")
        .select()
        .order("id", { ascending: true });
      setCartProducts(data || []);
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

  async function getUser() {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
      console.log("not logged in");
    } else {
      setUser(data);
    }
  }

  // handle what happens on click.
  function handleClick(e) {
    e.preventDefault();

    if (user === null) {
      alert("Please login to add to cart.");
      return;
    }

    // NEW HANDLE SUBMISSIONS
    handleDatabase();
  }

  async function handleDatabase() {
    const isProductInCart = cartProducts.some(
      (product) => product.product_id === productData.id
    );

    if (isProductInCart) {
      await deleteCartItem(productData);
      setIsInCart(false);
    } else {
      // if item does not exists on database
      await createCartItem(productData);
      setIsInCart(true);
    }

    await getCart();
  }

  async function createCartItem(productData) {
    const { data, error } = await supabase
      .from("cart_items")
      .insert([
        {
          user_id: user.user.id,
          product_id: productData.id,
          quantity: 1,
          price_per: productData.price,
          product_title: productData.title,
        },
      ])
      .select();
    if (error) {
      console.error("Unable to insert to database.");
      alert("unable to remove from database, please try again.");
    }
  }
  async function deleteCartItem(productData) {
    const { data, error } = await supabase.from("cart_items").delete().match({
      user_id: user.user.id,
      product_id: productData.id,
    });
    if (error) {
      console.error("data unable to delete.");
      alert("unable to delete from cart.");
    }
  }

  if (loading) {
    return (
      <>
        <CircularLoading />
      </>
    );
  } else {
    return (
      <>
        <button
          onClick={(e) => {
            handleClick(e);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            id="cart"
            className={`size-8 stroke-gray-800 hover:stroke-pink-900 ${
              !isInCart
                ? `fill-none`
                : `fill-strongPink stroke-strongPink hover:stroke-pink-900 hover:fill-pink-900`
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
        </button>
      </>
    );
  }
}
