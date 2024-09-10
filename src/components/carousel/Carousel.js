import React, { useState, useEffect, useRef } from "react";

const Carousel = ({ slides, autoPlayInterval = 3000 , indicators=true}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slideRef = useRef(null);
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(goToNext, autoPlayInterval);

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex, autoPlayInterval]);

  return (
    <div className="carousel relative w-full h-2/3 xs:h-full mx-auto">
      <div className={`overflow-hidden w-full relative shadow-lg ${indicators ? 'h-4/5 rounded-t-md' : 'h-full rounded-md'}`}>
        <img
          src={slides[currentIndex]}
          alt={`Slide ${currentIndex}`}
          className="w-full h-full object-cover transition-transform duration-300"
        />
      </div>

      <button
        onClick={goToPrevious}
        className="absolute top-1/2 hidden left-4 transform -translate-y-1/2 p-2 text-3xl rounded-full focus:outline-none bg-white shadow-sm"
      >
        &#10094;
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 hidden right-4 transform -translate-y-1/2 p-2 text-3xl rounded-full focus:outline-none bg-white shadow-sm"
      >
        &#10095;
      </button>

      {indicators &&
              <div className="hidden xs:flex justify-center flex-1 h-1/5">
              {slides.map((_, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`cursor-pointer w-full h-auto flex justify-center items-center ${
                    currentIndex === index ? "bg-blue-500" : "bg-gray-400"
                  }`}
                >
                  Slide {index +1}
                </div>
              ))}
            </div>
      }
    </div>
  );
};
export default Carousel;