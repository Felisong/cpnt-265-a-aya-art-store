"use client";
import { useEffect, useState } from "react";
import Cards from "../components/product-related/Cards";
import Title from "../components/Title";
import { createClient } from "@/utils/supabase/client";

export default function Products() {
  const supabase = createClient();
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
    getCart();
  }, []);

  async function getProducts() {
    try {
      const { data } = await supabase.from("products").select();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  }
  async function getCart() {
    try {
      const { data } = await supabase.from("cart_items").select();
      setCart(data || []);
    } catch (error) {
      console.error("unable to get items", error);
    }
  }

  console.log(cart);
  return (
    <>
      <Title text="Products" />

      <div className="flex m-4 justify-center">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.length > 0 ? (
            products.map((product) => (
              <Cards
                key={product.id}
                customize={{
                  title: product.title,
                  description: product.description,
                  extra: product.extra,
                  image_one: product.image_one,
                  image_two: product.image_two,
                  image_three: product.image_three,
                  image_alt_one: product.image_alt_one,
                  image_alt_two: product.image_alt_two,
                  image_alt_three: product.image_alt_three,
                  id: product.id,
                  price: product.price,
                }}
              />
            ))
          ) : (
            <p> Loading Cards...</p>
          )}
        </div>
      </div>
      <div>
        <h2 className="text-3xl flex w-full justify-center"> Cart </h2>
        <ul>
          {cart.map((product) => {
            return (
              <li key={product.id} className="flex w-full justify-center">
                <p className="w-1/3">{product.product_title + "  "}</p>

                <p>{product.quantity} </p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
