"use client";
import { useEffect, useState } from "react";
import Cards from "../components/product-related/Cards";
import Title from "../components/Title";
import { createClient } from "@/utils/supabase/client";
import CartDisplay from "../components/product-related/CartDisplay";
import { redirect } from "next/navigation";
import ErrorModal from "../components/loading/ErrorModal";

export default function Products() {
  const supabase = createClient();
  const [products, setProducts] = useState([]);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    try {
      const { data } = await supabase.from("products").select();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  }

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
      <div className="bg-backDropPink flex flex-col items-center pb-8">
        <CartDisplay products={products} />
      </div>
    </>
  );
}
