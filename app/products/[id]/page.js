"use client";

import { CarouselProduct } from "@/app/components/hero-comps/CarouselProduct";
import AddToCartBtn from "@/app/components/product-related/AddToCartBtn";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProductPage({ params }) {
  const supabase = createClient();
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [id, setId] = useState(null);
  const [slides, setSlides] = useState(null);
  const [options, setOptions] = useState(null);
  // Declared function to unwrap the params promise
  async function unwrapParams() {
    const { id } = await params; // Await the `params` promise
    setId(id);
  }
  async function getProducts() {
    try {
      const { data } = await supabase.from("products").select();
      setProducts(data);
      setError("");
      const product = data.filter((product) => product.id === id);
      setProduct(product[0]);
      const slides = [
        { src: product[0].image_one, alt: product[0].image_alt_one },
        { src: product[0].image_two, alt: product[0].image_alt_two },
        { src: product[0].image_three, alt: product[0].image_alt_three },
      ];
      const options = [
        {
          loop: true,
          speed: 10,
          align: "center",
        },
      ];
      setSlides(slides);
      setOptions(options);
    } catch (error) {
      console.error(error);
      setLoading(true);
      setError("could not load product.");
    }
  }

  useEffect(() => {
    unwrapParams();
  }, [params]);

  useEffect(() => {
    if (!id) return;
    getProducts();
    setLoading(false);
  }, [id]);

  // console.log(product);

  if (error)
    return (
      <p className="text-center text-lg text-red-500">Product not found.</p>
    );
  if (!product) {
    return <p className="text-center text-lg text-yellow-500">Loading...</p>;
  } else {
    return (
      <div className="flex flex-col lg:flex-row">
        <div className="text-center text-lg lg:my-20 lg:w-1/2">
          <div className="lg:m-4 lg:rounded-3xl">
            <CarouselProduct slides={slides} options={options} />
          </div>
        </div>

        <div className="flex flex-col lg:w-1/2 text-lg my-20 mx-8 lg:pt-24">
          <h1 className="text-3xl pb-8">{product.title}</h1>
          <p className="pb-12"> {product.description + product.extra}</p>
          <h2 className="text-2xl">Price: {product.price}</h2>
          <p className="text-base"> tags: {product.tags}</p>
          <AddToCartBtn productData={product} />
        </div>
      </div>
    );
  }
}
