/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs , Autoplay} from "swiper/modules";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

export default function ThumbsGallery({ thumbs }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <div className="thumbs bg-white">
      <div className="relative">
        {/* Previous and Next buttons */}
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
        {/* Main Swiper */}
        <Swiper
        
          spaceBetween={10}
          navigation={{
            nextEl: nextRef.current,
            prevEl: prevRef.current,
          }}
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
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2 py-2"
        >
          {thumbs?.map((thumb, index) => (
            <SwiperSlide
              key={index}                        
              className="flex items-center justify-center bg-white"
            >                                                      
              <img src={thumb} className="object-contain max-h-64 cursor-pointer" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Thumbnails Swiper */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={2}
        slidesPerView={8}
        freeMode={true}
        loop={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper px-3"
      >
        {thumbs?.map((thumb, index) => (
          <SwiperSlide
            key={index}
            className={`rounded-md ${
              currentIndex === index ? "border-2 border-blue-500" : ""
            } h-20 flex items-center justify-center bg-white`}
          >
            <div onClick={() => setCurrentIndex(index)}>
              <img
                src={thumb}
                className="object-contain max-h-18 object-center cursor-pointer"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
