"use client";
import React from "react";
import Slider from "react-slick";

function SimpleSlider({ images }) {
  console.log(images);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    accessibility: true,
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <img src={images} alt={images}></img>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
      </Slider>
    </div>
  );
}

export default SimpleSlider;
