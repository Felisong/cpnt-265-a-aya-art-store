"use client";
import { useEffect, useState } from "react";
import Cards from "../components/product-related/Cards";
import Title from "../components/Title";
import { createClient } from "@/utils/supabase/client";
import CartDisplay from "../components/product-related/CartDisplay";
import { redirect } from "next/navigation";
import ErrorModal from "../components/loading/ErrorModal";
import BoxSkeleton from "../components/loading/BoxSkeleton";
import AutocompleteTag from "../components/product-related/AutoCompleteTag";
import Link from "next/link";

// TODO: get product id pages up and running. it worked earlier? I though. will go over it tomorrow.
const tags = [
  { label: "keychain", id: 1 },
  { label: "acrylic-charm", id: 2 },
  { label: "phone-accessory", id: 3 },
  { label: "sticker", id: 4 },
  { label: "original", id: 5 },
  { label: "stationary", id: 6 },
];

export default function Products() {
  const supabase = createClient();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const repeat = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    try {
      const { data } = await supabase.from("products").select();
      setProducts(data);
      setLoading(false);
      setError("");
    } catch (error) {
      console.error(error);
      setLoading(true);
      alert("could not load products.");
      setError("could not load products.");
    }
  }

  if (!loading) {
    return (
      <>
        <Title text="Products" />
        <div className="flex flex-col lg:flex-row">
          <div className="flex m-4 justify-center lg:justify-start lg:w-2/2 mb-20">
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
          <div className="bg-backDropPink flex flex-col items-center pb-8 lg:w-1/3 lg:h-fit lg:rounded-3xl lg:m-4">
            {/* <div>
              {tags.map((tag) => (
                <Link>meow</Link>
              ))}
            </div> */}
            <CartDisplay />
            <button
              onClick={(e) => {
                redirect("/checkout");
              }}
              className="bg-buttonPurple text-white p-4 text-lg rounded-full w-fit m-6 mb-4 flex mx-auto my-10 hover:bg-purple-950 hover:text-white transition"
            >
              Go to Checkout Page.
            </button>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Title text="Products" />
        <p> {error ? error : error}</p>
        <div className="flex m-4 justify-center">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
            {repeat.map((item) => (
              <div key={item} className="self-center">
                {" "}
                <BoxSkeleton
                  dimensions={{
                    height: 450,
                    width: 330,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}
