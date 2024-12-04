"use client";
import Image from "next/image";
import { useState } from "react";

export default function ImageCarousel() {
  const images = [
    {
      src: "/hamster-collection-reusable-sticker-book-size-a5-50-sheets-stationary-1.webp",
      alt: "A journal with a pink cute hamster staring at you",
    },
    {
      src: "/pokemon-25th-anniversary-mewtwo-and-mew-totes-bag-1.webp",
      alt: "A cloth bag with an illustration of Mewtwo and Mew from pokemon.",
    },
    {
      src: "/kingdom-hearts-tamagotchi-keychain-sora-roxas-double-sided-clear-acrylic-1.webp",
      alt: "2 keychains that look like tomagachis. chibi-fied (cute and chubby cheeked) drawn characters from Kingdom Hearts. The characters are Sora, and Roxas. ",
    },
  ];
  // const slides = document.getElementsByClassName("carousel-item");
  // const dots = document.getElementsByClassName("dot");
  // const [position, setPosition] = useState(0);
  // const numOfSlides = slides.length;

  // const main = 1;

  return (
    <>
      <div className="w-full flex flex-col lg:mx-auto lg:items-center bg-backDropPink lg:p-4">
        {/* if index === img-id then execute then show item */}
        <div className="carousel-item carousel-item-visible">
          <img src={images[0].src} alt={images[0].alt} />
        </div>
        {/* <div className="carousel-item">
          <img src={images[1].src} alt={images[1].alt} />
        </div>
        <div className="carousel-item">
          <img src={images[2].src} alt={images[2].alt} />
        </div> */}
        <div className="carousel-actions">
          <button
            id="carousel-button-prev"
            aria-label="Previous"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            &lt;
          </button>
          <button id="carousel-button-next" aria-label="Next">
            &gt;
          </button>
        </div>
        <div className="carousel-dots">
          <input
            className="dot selected-dot"
            type="radio"
            name="dot"
            defaultChecked=""
          />
          <input className="dot" type="radio" name="dot" />
          <input className="dot" type="radio" name="dot" />
        </div>
      </div>
    </>
  );
}
