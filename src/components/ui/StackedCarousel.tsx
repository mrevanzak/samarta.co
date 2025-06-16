import { useState, useEffect } from 'react';

type ImageType = {
  src: string;
  alt?: string;
};

type StackedCarouselProps = {
  images: ImageType[];
};

export default function StackedCarousel({ images }: StackedCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  // Autoplay functionality
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 2000); // 2 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="relative">
      {images.map((image, index) => (
        <div
          key={index}
          className={`select-none transition-transform duration-500 ease-in-out ${
            index === currentIndex
              ? 'relative z-10 w-fit translate-x-0 brightness-105'
              : index === (currentIndex + 1) % images.length
                ? 'absolute top-0 z-0 translate-x-1/4 rotate-6 scale-75 brightness-50'
                : index === (currentIndex - 1 + images.length) % images.length
                  ? 'absolute top-0 z-0 -translate-x-1/4 -rotate-6 scale-75 brightness-50'
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
            className="aspect-[2/3] w-60 rounded-lg object-cover shadow-lg hover:cursor-pointer sm:w-72 md:w-80 lg:w-96"
          />
        </div>
      ))}
    </div>
  );
}
