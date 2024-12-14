import Image from "next/image";
import ImageCarousel from "./components/hero-comps/ImageCarousel";
import ProductSection from "./components/product-related/ProductsSection";
import { Button } from "@mui/material";
import Title from "./components/Title";
import AboutSection from "./components/AboutSection";

export default function Home() {
  const options = {
    loop: true,
    speed: 10,
    align: "center",
  };
  const slides = [
    {
      src: "/hamster-collection-reusable-sticker-book-size-a5-50-sheets-stationary-1.webp",
      alt: "A notebook that comes with a complimentary sticker. The notebook as a cute pink hamster, three drawings of this hamster are on the screen. It is a reusable sticker book.",
    },
    {
      src: "/kingdom-hearts-tamagotchi-keychain-sora-roxas-double-sided-clear-acrylic-1.webp",
      alt: "kingdom Hearts Tamagotchi keychain Sora/Roxas - Double-Sided - Clear Acrylic Charms",
    },
    {
      src: "/pokemon-25th-anniversary-mewtwo-and-mew-totes-bag-1.webp",
      alt: "A Mewtwo and Mew styled bag based off the 2 pokemon. Woolen bag, beautiful colors.",
    },
  ];

  return (
    <>
      <div>
        <ImageCarousel slides={slides} options={options} />
      </div>

      <div>
        <ProductSection />
        <button className="bg-buttonPurple text-white p-4 text-2xl font-bold rounded-full flex mx-auto mb-20">
          Shop Now!
        </button>
      </div>
      <AboutSection />
    </>
  );
}
