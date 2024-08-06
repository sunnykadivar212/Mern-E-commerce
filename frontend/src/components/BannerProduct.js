import React, { useEffect, useState } from "react";
import image1 from "../assest/banner/img1.webp";
import image2 from "../assest/banner/img2.webp";
import image3 from "../assest/banner/img3.jpg";
import image4 from "../assest/banner/img4.jpg";
import image5 from "../assest/banner/img5.webp";
import image1mobile from "../assest/banner/img1_mobile.jpg";
import image2mobile from "../assest/banner/img2_mobile.webp";
import image3mobile from "../assest/banner/img3_mobile.jpg";
import image4mobile from "../assest/banner/img4_mobile.jpg";
import image5mobile from "../assest/banner/img5_mobile.png";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";

const BannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const desktopImages = [image1, image2, image3, image4, image5];

  const mobileImages = [
    image1mobile,
    image2mobile,
    image3mobile,
    image4mobile,
    image5mobile
  ];

  const nextImage = () => {
    if (desktopImages.length - 1 > currentImage) {
      setCurrentImage((preve) => preve + 1);
    }
  };

  const prevImage = () => {
    if (currentImage != 0) {
      setCurrentImage((preve) => preve - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (desktopImages.length - 1 > currentImage) {
        nextImage();
      } else {
        setCurrentImage(0);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [currentImage]);

  return (
    <div className="container mx-auto px-4 rounded">
      <div className="h-56 md:h-72 w-full bg-slate-200 relative">
        <div className="absolute z-10 h-full w-full flex items-center">
          <div className="w-full md:flex justify-between text-3xl hidden">
            <button
              onClick={prevImage}
              className="bg-white rounded-full shadow-md p-2"
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={nextImage}
              className="bg-white rounded-full shadow-md p-2"
            >
              <FaAngleRight />
            </button>
          </div>
        </div>

        {/**desktop and tablets version */}
        <div className="hidden md:flex w-full h-full overflow-hidden">
          {desktopImages.map((imageURL, index) => {
            return (
              <div
                className="w-full h-full min-w-full min-h-full translate transition-all"
                key={imageURL}
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <img src={imageURL} className="w-full h-full" />
              </div>
            );
          })}
        </div>

        {/**mobile version */}
        <div className="flex w-full h-full overflow-hidden md:hidden">
          {mobileImages.map((imageURL, index) => {
            return (
              <div
                className="w-full h-full min-w-full min-h-full translate transition-all"
                key={imageURL}
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <img src={imageURL} className="w-full h-full object-cover" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;
