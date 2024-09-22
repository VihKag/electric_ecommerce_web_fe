import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import React, { useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";

export default function SwiperWrapper(props) {
  // Tạo refs cho các nút điều hướng
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // Tạo các nhóm item để hiển thị trong mỗi slide
  const groupedItems = [];
  if (props.items.length > 15 && props.default !== true) {
    for (let i = 0; i < props.items.length; i += 2) {
      groupedItems.push(props.items.slice(i, i + 2)); // Mỗi nhóm gồm 2 item
    }
  } else {
    groupedItems.push(...props.items.map(item => [item]));
  }

  return (
    <div className="relative">
      <div
        ref={nextRef}
        className="swiper-button-next px-6 py-8 bg-opacity-50 bg-white scale-75 rounded-full shadow-lg"
      ></div>
      <div
        ref={prevRef}
        className="swiper-button-prev px-6 py-8 bg-opacity-50 bg-white scale-75 rounded-full shadow-lg"
      >
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: nextRef.current,
          prevEl: prevRef.current,
        }}
        onBeforeInit={(swiper) => {
          // Thêm refs vào Swiper instance
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.params.navigation.prevEl = prevRef.current;
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
        {groupedItems.map((group, index) => (
          <SwiperSlide key={index} className="pl-1 pr-2 py-2">
            <div className="flex flex-col">
              {group.map((item, i) => (
                <div key={i} className="mb-2">
                  {item}
                </div>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
