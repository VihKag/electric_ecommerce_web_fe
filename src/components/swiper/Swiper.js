// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import React, { useRef } from "react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

export default function SwiperWrapper(props) {
  // Tạo refs cho các nút điều hướng
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <div className="relative">
      <div ref={nextRef} className="swiper-button-next bg-white px-4 py-2 rounded-full after:scale-50 shadow-lg border-2"></div>
      <div ref={prevRef} className="swiper-button-prev bg-white px-4 py-2 rounded-full after:scale-50 shadow-lg border-2"></div>


      <Swiper
        modules={[Navigation]}
        spaceBetween={4}
        slidesPerView={1}
        navigation={{
          nextEl: nextRef.current,
          prevEl: prevRef.current,
        }}
        breakpoints={{
          480: {
            slidesPerView: 2,
          },
          640: {
            slidesPerView: 3,
          },
          1080: {
            slidesPerView: 4,
          },
          1280: {
            slidesPerView: 5,
          },
        }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {props.items.map((item, index) => {
          return (
            <>
              <SwiperSlide className="p-1" key={index}>{item}</SwiperSlide>
            </>
          );
        })}
      </Swiper>
    </div>
  );
}
