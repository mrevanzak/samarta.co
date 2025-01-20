import React, { useState } from 'react'
 
type ImageType = {
  src: string;
  alt?: string;
};
 
type StackedCarouselProps = {
  images: ImageType[];
};
 
const StackedCarouselTSX: React.FC<StackedCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
 
  const goToPrevious = () => {
    console.log("images length for prev: ", images.length);
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    console.log(currentIndex);
  };
 
  const goToNext = () => {
    console.log("images length for next:", images.length);
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    console.log(currentIndex);
  };
 
  return (
    <div className="relative flex w-full flex-col items-center">
      {/* Carousel Images */}
      <div className="relative flex w-full left-20 bottom-56 sm:left-2 sm:bottom-10 md:bottom-9 lg:left-28 lg:bottom-28">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute transition-transform duration-500 ease-in-out ${
              index === currentIndex
                ? 'z-10 translate-x-0 brightness-105'
                : index === (currentIndex + 1) % images.length
                  ? 'z-0 translate-x-1/4 rotate-6 brightness-50 scale-75'
                  : index === (currentIndex - 1 + images.length) % images.length
                    ? 'z-0 -translate-x-1/4 -rotate-6 brightness-50 scale-75'
                    : 'hidden'
            }`}
            onClick={
                index === currentIndex
                  ? undefined
                  : index === (currentIndex + 1) % images.length
                  ? goToNext
                  : index === (currentIndex - 1 + images.length) % images.length
                  ? goToPrevious
                  : undefined
              }
              aria-label={
                index === (currentIndex + 1) % images.length
                  ? 'Next Slide'
                  : index === (currentIndex - 1 + images.length) % images.length
                  ? 'Previous Slide'
                  : ''
              }
          >
            <img
              src={image.src}
              alt={image.alt || `Slide ${index + 1}`}
              className="rounded-lg shadow-lg aspect-[2/3] w-40 sm:w-52 md:w-60 lg:w-72 object-cover hover:cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
 
export default StackedCarouselTSX;