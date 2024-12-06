import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function AddToCartBtn({ productData }) {
  const product = productData;
  const supabase = createClient();
  const [inCart, setInCart] = useState(false);
  const [productsInCart, setProductsInCart] = useState([]);
  const [user, setUser] = useState(null);

  const isInsideArr = (Element) => Element.id === product.id;
  // console log this later
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

  // getting data from database.
  useEffect(() => {
    getCart();
  }, [inCart]);
  useEffect(() => {
    getUser();
  }, []);

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
  console.log(product.id);
  // handle what happens on click.
  function handleClick(e) {
    e.preventDefault();
    !inCart ? setInCart(true) : setInCart(false);
  }

  async function handleDatabaseSubmit() {
    if (user) {
      if (!inCart) {
        if (findIndex !== -1) {
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
            console.error(`unable to push to database`, error);
            alert("unable to push product to database");
          }
          console.log("it worked!!!");
        }
      } else if (findIndex === -1) {
        productsInCart.push(product);
        // post to database

        const { data, error } = await supabase
          .from("cart_items")
          .insert([
            { user_id: user.user.id, product_id: product.id, quantity: 1 },
          ])
          .select();
        if (error) {
          console.error(`unable to push to database`, error);
          alert("unable to push product to database");
        }
        console.log("it worked!!!");
        console.log(data);
      }
    } else {
      alert(
        "cannot add to cart until user is logged in. Please make an account."
      );
    }
  }
  // console.log(`test no items in cart: `, productsInCart);

  // at this point, if there is data inside the database, it updates, if no data in database prodcutsInCart will be [].

  // on click I want to add that to the product data into the array.
  // after it is successfully added, post to the cart database.

  // every time in cart variable changes, it will run get  cart, which should update with the current database.

  // if user wants to get rid of item. delete it from database.

  // add an alert to happen on click, if not logged in, request to make an account
  function isLoggedIn() {
    if (!user.id) {
      alert("Please make an account to add to cart and order.");
    }
  }
  return (
    <>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          className="size-8 stroke-strongPink hover:stroke-pink-900"
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
