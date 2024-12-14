"use client";

import { CarouselProduct } from "@/app/components/hero-comps/CarouselProduct";
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
      console.log(`product: `, product[0]);
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

  if (error)
    return (
      <p className="text-center text-lg text-red-500">Product not found.</p>
    );
  if (!product) {
    return <p className="text-center text-lg text-yellow-500">Loading...</p>;
  } else {
    return (
      <div className="text-center text-lg">
        <div>
          meow!
          <CarouselProduct />
          {/* <img src={product.image_one} alt={product.image_alt_one}></img> */}
        </div>
      </div>
    );
  }
}
