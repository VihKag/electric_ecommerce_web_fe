import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import React, { useEffect, useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import {LeftOutlined} from "@ant-design/icons";
import ProductCard from "../card/ProductCard";
import { useNavigate } from "react-router-dom";
export default function SwiperWrapper(props) {
  const navigate = useNavigate();

  // Tạo refs cho các nút điều hướng
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // Tạo các nhóm item để hiển thị trong mỗi slide
  const groupedItems = [];
  if(props.items.length ===0){
    return null; // Trả về null nếu không có item nào để hiển thị
  }
  if (props.items.length > 15 && props.default !== true) {
    for (let i = 0; i < props.items.length; i += 2) {
      // Thay vì push item, tạo từng ProductCard và thêm vào groupedItems
      groupedItems.push(props.items.slice(i, i + 2).map((item)=> <ProductCard key={item._id} product={item} />)); // Mỗi nhóm gồm 2 item
    }
  } else {
     // Nếu có ít hơn hoặc bằng 15 item, mỗi nhóm chỉ chứa 1 ProductCard
  groupedItems.push(...props.items.map((item, index) => [<ProductCard key={index} product={item} />]));
  }


  return (
    <div className="relative">
      <div
        ref={nextRef}
        className="swiper-button-next hidden sm:flex text-black px-6 py-8 bg-opacity-50 bg-white sm:scale-[0.65] rounded-full shadow-lg"
      >
        <LeftOutlined />
      </div>
      <div
        ref={prevRef}
        className="swiper-button-prev hidden sm:flex text-black px-6 py-8 bg-opacity-50 bg-white sm:scale-[0.65] rounded-full shadow-lg"
      >
        <LeftOutlined />
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={0}
        slidesPerView={2}
        color="black"
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
          560: {
            slidesPerView: 3,
          },
          840: {
            slidesPerView: 4,
          },
          1160: {
            slidesPerView: 5,
          },
        }}
        // onSlideChange={() => console.log("slide change")}
        // onSwiper={(swiper) => console.log(swiper)}
      >
        {groupedItems.map((group, index) => (
          <SwiperSlide key={index} className="pl-1 pr-2 py-2">
            <div className="flex flex-col">
              {group.map((item, i) => (
                <div key={i} className="mt-3">
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
