"use client";
import { Card } from "@mui/material";
import Cards from "./Cards";
import Header from "../Title";
import Title from "../Title";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export default function ProductSection() {
  const [products, setProducts] = useState([]);
  const [snippet, setSnippet] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);
  useEffect(() => {
    preview();
  }, [products]);

  async function getProducts() {
    try {
      const { data } = await supabase.from("products").select();
      setProducts(data);
    } catch (error) {
      console.error("couldn't fetch data", error);
    }
  }
  function preview() {
    const previewArr = products.slice(0, 4);
    setSnippet(previewArr);
  }

  return (
    <div className="mt-24 mb-0 w-full mx-auto">
      <Title text="Products" />
      <div className="flex m-4 justify-center">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {snippet.map((product) => (
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
                price: product.price,
              }}
            />
          ))}
        </div>
      </div>
      <div className="max-w-full grid md:grid-cols-2 lg:grid-cols-4 justify-center items-center gap-6 mt-24 md:mx-8 lg:mx-12"></div>
    </div>
  );
}
