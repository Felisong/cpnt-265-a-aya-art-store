"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Cards from "../components/products-section/Cards";
import Title from "../components/Title";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    const { data } = await supabase.from("products").select();
    setProducts(data);
  }
  // console.log(products[0].image_one);
  return (
    <>
      <Title text="Products" />
      <div className="flex m-4 justify-center">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => (
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
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
