import Image from "next/image";
import ImageCarousel from "./components/hero-comps/ImageCarousel";
import ProductSection from "./components/product-related/ProductsSection";
import { Button } from "@mui/material";
import Title from "./components/Title";
import AboutSection from "./components/AboutSection";

export default function Home() {
  return (
    <>
      <ImageCarousel />
      <div>
        <ProductSection />
        <button className="bg-strongPink p-4 text-2xl font-bold rounded-full flex mx-auto mb-20">
          Shop Now!
        </button>
      </div>
      <AboutSection />
    </>
  );
}
