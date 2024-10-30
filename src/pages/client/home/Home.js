import React from "react";
import Carousel from "../../../components/carousel/Carousel";
import { Button} from "antd";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import SwiperWrapper from "../../../components/swiper/Swiper";
import ProductCard from "../../../components/card/ProductCard";
import {product} from "../../../data";
const menu = [
  {
    title: "Điện thoại",
    url: "/dien-thoai"
  },
  {
    title: "Tablet",
    url: "/tablet"
  },
  {
    title: "Laptop",
    url: "/laptop"
  },
  {
    title: "Camera",
    url: "/camera"
  },
  {
    title: "Loa",
    url: "/loa"
  },
  {
    title: "Tai nghe",
    url: "/tai-nghe"
  },
  {
    title: "PC",
    url: "/pc"
  },
  {
    title: "Tivi",
    url: "/tivi"
  },
  {
    title: "Phụ kiện",
    url: "/phu-kien"
  },
  {
    title: "Đồ gia dụng",
    url: "/do-gia-dung"
  },
  {
    title: "Khuyến mãi",
    url: "/khuyen-mai"
  }
];


export default function Home() {
  const slides = [
    "https://via.placeholder.com/600x400?text=Slide+1",
    "https://via.placeholder.com/600x400?text=Slide+2",
    "https://via.placeholder.com/600x400?text=Slide+3",
    "https://via.placeholder.com/600x400?text=Slide+4",
  ];
  const featuredProducts = product.map((product, index) => (
    <ProductCard key={index} product={product}/>
  ));

  return (
    <>
      <div className="max-w-[1200px] container">
        <div className="top-home sm:h-[480px]  mx-auto flex transition-all">
          <div className="main-menu w-1/5 hidden sm:block min-w-[180px] h-full rounded-md border shadow-lg duration-300">
            <div className="cascading-menu flex flex-col">
              {menu.map((item, index) => {
                return (
                  <div key={index} className="flex justify-between items-center hover:cursor-pointer hover:bg-gray-200 px-4 py-2 ">
                    <Link
                      to={item.url}
                      key={item.url}
                      className="hover:text-red-500 font-bold text-gray text-lg"
                    >
                      {item.title}
                    </Link>
                    <FontAwesomeIcon icon={faChevronRight} color="#374151" />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative slide-banner flex-1 ml-2 rounded-md h-full">
            <Carousel slides={slides} autoPlayInterval={3000} />
          </div>
        </div>

        <div className="block-featured-product my-4">
          <div>
            <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-text min-w-fit">Featured Products</h2>
            <div className="flex flex-wrap gap-2">
              {[
                "Apple",
                "Samsung",
                "Xiaomi",
                "OPPO",
                "vivo",
                "realme",
                "ASUS",
                "TECNO",
                "Nokia",
                "Infinix",
                "Oneplus",
                "Xem tất cả",
              ].map((brand) => (
                <Button key={brand} type="text" className="px-2 text-sm py-1 bg-gray-100 font-normal border border-gray-300">
                  {brand}
                </Button>
              ))}
            </div>
            </div>
            <div>
              <SwiperWrapper items={featuredProducts} />
            </div>
          </div>
        </div>
        
        <div className="block-featured-product my-4">
          <div>
            <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-text min-w-fit">Featured Products</h2>
            <div className="flex flex-wrap gap-2">
              {[
                "Apple",
                "Samsung",
                "Xiaomi",
                "OPPO",
                "vivo",
                "realme",
                "ASUS",
                "TECNO",
                "Nokia",
                "Infinix",
                "Oneplus",
                "Xem tất cả",
              ].map((brand) => (
                <Button key={brand} type="text" className="px-2 text-sm py-1 bg-gray-100 font-normal border border-gray-300">
                  {brand}
                </Button>
              ))}
            </div>
            </div>
            <div>
              <SwiperWrapper items={featuredProducts} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
