"use client";
import { Card } from "@mui/material";
import Cards from "./Cards";
import Header from "../Title";
import Title from "../Title";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function ProductSection() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    const { data } = await supabase.from("products").select();
    setProducts(data);
  }

  const sample = [];
  sample.push(products[0]);
  sample.push(products[1]);
  sample.push(products[2]);
  sample.push(products[3]);

  console.log(sample);
  return (
    <div className="mt-24 w-full flex flex-col  mx-auto">
      <Title text="Products" />
      <div className="flex m-4 justify-center">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {sample.map((product) => (
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
      <div className="max-w-full grid md:grid-cols-2 lg:grid-cols-4 justify-center items-center gap-6 mt-24 md:mx-8 lg:mx-12"></div>
    </div>
  );
}
