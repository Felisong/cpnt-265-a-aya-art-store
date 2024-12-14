import React, { useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";

export function CarouselProduct(props) {
  const { slides, options } = props;

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      console.log(emblaApi.slideNodes()); // Access API
    }
  }, [emblaApi]);

  // arrow key event listener test
  useEffect(() => {
    const keyDownEvent = (e) => {
      if (!emblaApi) return;

      if (e.key === "ArrowRight") {
        emblaApi.scrollNext();
      } else if (e.key === "ArrowLeft") {
        emblaApi.scrollPrev();
      }
    };
    // listening for event
    window.addEventListener("keydown", keyDownEvent);

    return () => {
      window.removeEventListener("keydown", keyDownEvent);
    };
  }, [emblaApi]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          <div className="embla__slide">
            <img src={slides[0].src} alt={slides[0].alt}></img>
          </div>
          <div className="embla__slide">
            <img src={slides[1].src} alt={slides[1].alt}></img>
          </div>
          <div className="embla__slide">
            <img src={slides[2].src} alt={slides[2].alt}></img>
          </div>
        </div>
      </div>
      <button className="embla__prev" onClick={scrollPrev}>
        Prev
      </button>
      <button className="embla__next" onClick={scrollNext}>
        Next
      </button>
    </div>
  );
}
