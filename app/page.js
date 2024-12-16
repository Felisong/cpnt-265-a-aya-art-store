"use client";
import Image from "next/image";
import ImageCarousel from "./components/hero-comps/ImageCarousel";
import ProductSection from "./components/product-related/ProductsSection";
import { Button } from "@mui/material";
import Title from "./components/Title";
import AboutSection from "./components/AboutSection";
import { CarouselProduct } from "./components/hero-comps/CarouselProduct";
import { redirect } from "next/navigation";
import Link from "next/link";
import LinkButtons from "./components/LinkButtons";

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
      <div className="lg:h-[70vh] lg:w-full lg:bg-backDropPink ">
        <CarouselProduct slides={slides} options={options} />
      </div>

      <div>
        <ProductSection />
        <div className="flex justify-center w-full">
          <LinkButtons text={{ text: "Shop Now!", href: "/products" }} />
        </div>
      </div>
      <AboutSection />
    </>
  );
}
