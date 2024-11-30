import React, { useState, useEffect } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
const Carousel = ({ slides, autoPlayInterval = 3000, indicators = true }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!slides || slides.length === 0) return; // Nếu slides không hợp lệ thì không chạy autoPlay
    const interval = setInterval(goToNext, autoPlayInterval);

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex, autoPlayInterval, slides]);

  const goToPrevious = () => {
    if (isAnimating) return; // Ngăn chặn nếu đang hiệu ứng
    setIsAnimating(true);

    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);

    setTimeout(() => {
      setIsAnimating(false);
    }, 500); // Thời gian hiệu ứng
  };

  const goToNext = () => {
    if (isAnimating) return; // Ngăn chặn nếu đang hiệu ứng
    setIsAnimating(true);

    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);

    setTimeout(() => {
      setIsAnimating(false);
    }, 300); // Thời gian hiệu ứng
  };

  if (!slides || slides.length === 0) {
    return <div className="carousel">No slides available</div>;
  }

  return (
    <div className="carousel relative w-full h-2/3 xs:h-full mx-auto">
      <div
        className={`overflow-hidden w-full relative shadow-lg ${
          indicators ? "h-4/5 rounded-md sm:rounded-t-md" : "h-full rounded-md"
        }`}
      >
        <div
          className="w-full h-full flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {slides.map((slide, index) => (
            <img
              key={index}
              src={slide.images}
              alt={slide.name}
              className="w-full h-full object-cover flex-shrink-0"
              style={{
                opacity: currentIndex === index ? 1 : 0,
                transition: "opacity 0.5s ease-in-out",
              }}
            />
          ))}
        </div>
      </div>

      <button
        onClick={goToPrevious}
        className="absolute top-1/2 hidden sm:block left-4 transform -translate-y-1/2 p-2 text-3xl rounded-full focus:outline-none bg-opacity-5 bg-white shadow-sm"
      >
        <LeftOutlined />
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 hidden sm:block right-4 transform -translate-y-1/2 p-2 text-3xl rounded-full focus:outline-none bg-opacity-5 bg-white shadow-sm"
      >
        <RightOutlined />
      </button>
      {/* Indicators (Dots): Always visible, but with mobile specific style */}
      {indicators && (
        <div className="xs:hidden absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`cursor-pointer w-3 h-3 rounded-full bg-white ${
                currentIndex === index ? "bg-primary" : "bg-opacity-50"
              }`}
            />
          ))}
        </div>
      )}

      {indicators && (
        <div className="hidden xs:flex justify-center flex-1 h-1/5">
          {slides.map((slide, index) => (
            <div
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`cursor-pointer w-full h-auto overflow-hidden flex justify-center items-center ${
                currentIndex === index
                  ? "border-primary border-b-4 duration-200 transform"
                  : ""
              }`}
            >
              <img className="w-full" src={slide.images} alt={slide.name} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Carousel;
