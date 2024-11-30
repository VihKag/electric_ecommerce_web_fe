/* eslint-disable jsx-a11y/alt-text */
import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs, Zoom } from "swiper/modules";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
export default function ThumbsGallery({ thumbs }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomScales, setZoomScales] = useState({}); // Track zoom scales for all slides
  const [currentIndex, setCurrentIndex] = useState(0);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const openFullscreen = (index) => {
    setCurrentIndex(index);
    setIsFullscreen(true);
    document.body.classList.add("overflow-hidden");
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
    document.body.classList.remove("overflow-hidden");
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      e.preventDefault();
      if (isFullscreen) {
        if (e.key === "Escape") closeFullscreen();
        if (e.key === "ArrowLeft") prevRef.current?.click();
        if (e.key === "ArrowRight") nextRef.current?.click();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen]);

  const handleWheelZoom = (e) => {
    if (isFullscreen) {
      setZoomScales((prevZoomScales) => {
        const newZoomScale = Math.min(
          Math.max(
            (prevZoomScales[currentIndex] || 1) + (e.deltaY < 0 ? 0.1 : -0.1),
            1
          ),
          3
        );
        return {
          ...prevZoomScales,
          [currentIndex]: newZoomScale,
        };
      });
    }
  };

  return (
    <div className="thumbs bg-white">
      <div className="relative">
        <div
          ref={nextRef}
          className="swiper-button-next text-black px-6 py-8 bg-opacity-25 bg-white scale-[0.65] rounded-full shadow-lg"
        >
          <RightOutlined />
        </div>
        <div
          ref={prevRef}
          className="swiper-button-prev text-black px-6 py-8 bg-opacity-25 bg-white scale-[0.65] rounded-full shadow-lg"
        >
          <LeftOutlined />
        </div>
        <Swiper
          spaceBetween={10}
          navigation={{ nextEl: nextRef.current, prevEl: prevRef.current }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.params.navigation.prevEl = prevRef.current;
          }}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
          loop={true}
          modules={[FreeMode, Navigation, Thumbs, Zoom]}
          className="mySwiper2 py-2"
        >
          {thumbs?.map((thumb, index) => (
            <SwiperSlide key={index} className="flex items-center justify-center bg-white">
              <img
                src={thumb}
                className="object-contain max-h-64 cursor-pointer"
                onClick={() => openFullscreen(index)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {isFullscreen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-30 transition-opacity duration-300 ease-in-out"
          onWheel={handleWheelZoom}
          onClick={(e) => e.target === e.currentTarget && closeFullscreen()} // Close when clicking outside the image
        >
          <button
            className="flex items-center justify-between absolute z-50 top-4 right-4 text-white text-[56px] hover:text-gray-400"
            onClick={() => closeFullscreen()}
          >
            &times;
          </button>
          <button
            onClick={() => prevRef.current?.click()}
            className="absolute z-10 left-4 text-white text-2xl bg-black bg-opacity-50 rounded-full p-4 hover:bg-opacity-70"
          >
            <LeftOutlined />
          </button>
          <button
            onClick={() => nextRef.current?.click()}
            className="absolute z-10 right-4 text-white text-2xl bg-black bg-opacity-50 rounded-full p-4 hover:bg-opacity-70"
          >
            <RightOutlined />
          </button>
          <Swiper
            initialSlide={currentIndex}
            navigation={{ nextEl: nextRef.current, prevEl: prevRef.current }}
            onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
            modules={[FreeMode, Navigation, Thumbs, Zoom]}
            className="mySwiper2 w-full h-full"
          >
            {thumbs?.map((thumb, index) => (
              <SwiperSlide key={index}>
                <div
                  className="swiper-zoom-container flex items-center justify-center"
                  style={{
                    transition: "transform 0.3s ease-in-out",
                    transform: `scale(${zoomScales[index] || 1})`, // Zoom only the current slide
                  }}
                >
                  <img
                    key={thumb}
                    src={thumb}
                    className="object-contain w-full h-full cursor-pointer"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Pagination */}
          <div className="absolute bottom-4 text-white">{`${
            currentIndex + 1
          } / ${thumbs.length}`}</div>
        </div>
      )}

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={2}
        slidesPerView={8}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper px-3"
      >
        {thumbs?.map((thumb, index) => (
          <SwiperSlide
            key={index}
            className={`${
              currentIndex === index ? "border-2 border-blue-500" : ""
            } rounded-md !w-1/6 h-20 flex items-center justify-center bg-white`}
          >
            <div
              onClick={() => {
                setCurrentIndex(index);
              }}
            >
              <img
                src={thumb}
                className={`object-contain max-h-18 object-center cursor-pointer`}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
