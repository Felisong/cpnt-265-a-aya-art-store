import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function AddToCartBtn({ productData }) {
  const product = productData;
  const supabase = createClient();
  const [inCart, setInCart] = useState(false);
  const [productsInCart, setProductsInCart] = useState([]);
  const [updatedProducts, setUpdatedProducts] = useState(productsInCart);
  const [user, setUser] = useState(null);
  const [errMsg, setErrMsg] = useState(null);

  const isInsideArr = (Element) => Element.product_id === product.id;
  const findIndex = productsInCart.findIndex(isInsideArr);
  // console log this later

  // if it is in cart, keep it onload so user knows its loaded.
  const addedToCart = () => {
    if (findIndex !== -1) {
      setInCart(true);
    }
  };

  useEffect(() => {
    addedToCart();
  }, []);

  useEffect(() => {
    setUpdatedProducts(productsInCart);
  }, [productsInCart]);
  // getting data from database.
  useEffect(() => {
    getCart();
  }, [inCart]);

  useEffect(() => {
    getUser();
  }, []);

  // consider delaying when this fires out so that the arr has a chance to update?
  // useEffect(() => {
  //   if (user) {
  //     handleDatabaseSubmit();
  //     setErrMsg(null);
  //   } else {
  //     setErrMsg("cannot submit until signed in.");
  //   }
  // }, [inCart]);

  async function getCart() {
    try {
      const { data } = await supabase.from("cart_items").select();
      setProductsInCart(data);
    } catch (error) {
      console.log("unable to get items", error);
    }
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

    setUpdatedProducts([
      ...updatedProducts,
      {
        user_id: user.user.id,
        product_id: product.id,
        quantity: 1,
        price_per: product.price,
      },
    ]);
    // !inCart ? setInCart(true) : setInCart(false);
    console.log(productsInCart, product);
  }
  console.log(updatedProducts);

  // handles database things
  async function handleDatabaseSubmit() {
    if (!inCart) {
      console.log(`is this returning what I want?`);
      if (findIndex !== -1) {
        console.log(`test findindex`, findIndex);
        productsInCart.splice(findIndex, 1);
        //delete from database.
        const { data, error } = await supabase
          .from("cart_items")
          .delete()
          .match({
            user_id: user.user.id,
            product_id: product.id,
          });
        console.log(data);
        if (error) {
          console.error(`unable to delete from database`, error);
          alert("unable to delete product from database");
        }
        console.log("it worked!!!");
      }
    } else if (findIndex === -1) {
      console.log(`test findindex`, findIndex);
      productsInCart.push(product);
      // post to database

      const { data, error } = await supabase
        .from("cart_items")
        .insert([
          {
            user_id: user.user.id,
            product_id: product.id,
            quantity: 1,
            price_per: product.price,
          },
        ])
        .select();
      if (error) {
        console.error(`unable to push to database`, error);
        alert("unable to push product to database");
      }
      console.log("it worked!!!");
      console.log(data);
    }
  }
  // console.log(`test no items in cart: `, productsInCart);
  // console.log(product.id);
  // console.log(`is logged in?`, Boolean(user));
  // console.log(`whats the arr looking like: `, productsInCart);
  // console.log(`maybe change id`, productsInCart[0]);
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
          className={`size-8 stroke-strongPink hover:stroke-pink-900 ${
            !inCart
              ? `fill-none`
              : `fill-strongPink hover:stroke-pink-900 hover:fill-pink-900`
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
