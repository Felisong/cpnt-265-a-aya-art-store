import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function AddToCartBtn({ productData }) {
  const product = productData;
  const supabase = createClient();

  const [inCart, setInCart] = useState(false);
  const [initialCart, setInitialCart] = useState([]);
  const [cartProducts, setCartProducts] = useState(initialCart);
  const [user, setUser] = useState(null);
  const [errMsg, setErrMsg] = useState(null);

  const isInsideArr = (Element) => Element.product_id === product.id;
  const findIndex = cartProducts.findIndex(isInsideArr);

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    addedToCart();
  }, []);

  // getting data from database.
  useEffect(() => {
    getCart();
  }, []);

  // ON LOAD FUNCTIONS
  async function getCart() {
    try {
      const { data } = await supabase.from("cart_items").select();
      setInitialCart(data);
    } catch (error) {
      console.error("unable to get items", error);
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

  const addedToCart = () => {
    if (findIndex !== -1) {
      setInCart(true);
    }
  };

  // handle what happens on click.
  function handleClick(e) {
    e.preventDefault();

    // check if user is logged in
    if (user === null) {
      alert("Please login to add to cart.");
    } else {
      // NEW HANDLE SUBMISSIONS
      if (findIndex !== -1) {
        setCartProducts(cartProducts.filter((item) => item.id !== product.id));
      }
      // will make cartProducts have all items except "this" one.
      // FUNCTION DELETE FROM DATABASE
      else {
        // else. iTEM DOES NOT EXIST.
        // set Cart
        setCartProducts([
          // all the other cartProducts if any
          ...cartProducts,
          // adds "this" into the array
          {
            user_id: user.user.id,
            product_id: product.id,
            quantity: 1,
            price_per: product.price,
          },
        ]);
        // push the new cartsProducts to the database. Which initial cart will try to load, because we changed cartProducts. So now initial cart has the updated cart.  add cartProducts as dependency on getCart effect.
      }
    }
  }

  console.log(`check if logged in`, user === null);

  // handles database things
  async function handleDatabaseSubmit() {
    if (!inCart) {
      if (findIndex !== -1) {
        console.log(`test findindex`, findIndex);
        initialCart.splice(findIndex, 1);
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
      initialCart.push(product);
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
  // console.log(`test no items in cart: `, initialCart);
  // console.log(product.id);
  // console.log(`is logged in?`, Boolean(user));
  // console.log(`whats the arr looking like: `, initialCart);
  // console.log(`maybe change id`, initialCart[0]);
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
