import Image from "next/image";
import ImageCarousel from "./components/heroComps/ImageCarousel";
import ProductSection from "./components/products-section/ProductsSection";

export default function Home() {
  return (
    <>
      <ImageCarousel />

      <ProductSection />
    </>
  );
}
