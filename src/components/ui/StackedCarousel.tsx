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
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    console.log(currentIndex);
  };
 
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    console.log(currentIndex);
  };
 
  return (
    <div className="relative flex w-full flex-col items-center">
      {/* Carousel Images */}
      <div className="relative flex w-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute w-full transition-transform duration-500 ease-in-out ${
              index === currentIndex
                ? 'z-10 translate-x-0'
                : index === (currentIndex + 1) % images.length
                  ? 'z-0 translate-x-full'
                  : index === (currentIndex - 1 + images.length) % images.length
                    ? 'z-0 -translate-x-full'
                    : 'hidden'
            }`}
          >
            <img
              src={image.src}
              alt={image.alt || `Slide ${index + 1}`}
              className="h-auto w-full rounded-lg shadow-lg"
            />
          </div>
        ))}
      </div>
 
      {/* Navigation Buttons */}
      <div className="mt-4 flex space-x-4 z-50">
        <button
          className="h-8 w-8 rounded-full border border-gray-300 bg-white shadow hover:bg-gray-100 focus:outline-none"
          onClick={goToPrevious}
          aria-label="Previous Slide"
        >
          &larr;
        </button>
        <button
          className="h-8 w-8 rounded-full border border-gray-300 bg-white shadow hover:bg-gray-100 focus:outline-none"
          onClick={goToNext}
          aria-label="Next Slide"
        >
          &rarr;
        </button>
      </div>
    </div>
  );
};
 
export default StackedCarouselTSX;