/* eslint-disable jsx-a11y/alt-text */
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

export default function ThumbsGallery() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <div className="thumbs">
      <div className="relative">
        <div
          ref={nextRef}
          className="swiper-button hidden swiper-button-next bg-opacity-15 text-white px-6 py-8 bg-white rounded-full scale-[.35] shadow-lg"
        ></div>
        <div
          ref={prevRef}
          className="swiper-button hidden swiper-button-prev bg-opacity-15 text-white px-6 py-8 bg-white rounded-full scale-[.35] shadow-lg"
        ></div>
        <Swiper
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          }}
          loop={true}
          spaceBetween={10}
          navigation={{
            nextEl: nextRef.current,
            prevEl: prevRef.current,
          }}
          onBeforeInit={(swiper) => {
            // Thêm refs vào Swiper instance
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.params.navigation.prevEl = prevRef.current;
          }}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2 py-2"
        >
          <SwiperSlide>
            <img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung_galaxy_s24_ultra_256gb_-_1.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung_galaxy_s24_ultra_256gb_-_2.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung_galaxy_s24_ultra_256gb_-_9.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung_galaxy_s24_ultra_256gb_-_7.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung_galaxy_s24_ultra_256gb_-_8.png" />
          </SwiperSlide>
        </Swiper>
      </div>

      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung_galaxy_s24_ultra_256gb_-_1.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung_galaxy_s24_ultra_256gb_-_2.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung_galaxy_s24_ultra_256gb_-_9.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung_galaxy_s24_ultra_256gb_-_7.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung_galaxy_s24_ultra_256gb_-_8.png" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
