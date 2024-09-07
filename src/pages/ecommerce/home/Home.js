import React from "react";
import Carousel from "../../../components/carousel/Carousel";
import { Badge, Button, Card, Dropdown } from "antd";
import menuData from "./menuData.json";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faHeart,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import SwiperWrapper from "../../../components/swiper/Swiper";
import ProductCard from "../../../components/card/ProductCard";
// import { faHeart } from "@fortawesome/free-regular-svg-icons";
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
    title: "Loa & Tai nghe",
    url: "/loa-tai-nghe"
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
    title: "Hàng cũ",
    url: "/hang-cu"
  },
  {
    title: "Khuyến mãi",
    url: "/khuyen-mai"
  }
];

const product = [
  {
    discount: "18%",
    image: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-z-flip-6-xanh-duong-6_2.png",
    title: "Samsung Galaxy S24 Ultra 12GB 256GB",
    price: "27.990.000\u0111",
    oldPrice: "33.990.000\u0111",
    sMemberDiscount: "280.000\u0111",
    installment: "600.000\u0111",
    rating: 5,
  },
  {
    discount: "16%",
    image: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-z-flip-6-xanh-duong-6_2.png",
    title: "iPhone 15 Pro Max 256GB | Ch\u00EDnh h\u00E3ng VN/A",
    price: "29.390.000\u0111",
    oldPrice: "34.990.000\u0111",
    sMemberDiscount: "294.000\u0111",
    installment: "600.000\u0111",
    rating: 5,
  },
  {
    discount: "20%",
    image: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-z-flip-6-xanh-duong-6_2.png",
    title: "iPhone 13 128GB | Ch\u00EDnh h\u00E3ng VN/A",
    price: "13.890.000\u0111",
    oldPrice: "17.990.000\u0111",
    sMemberDiscount: "139.000\u0111",
    installment: "600.000\u0111",
    rating: 5,
  },
  {
    discount: "17%",
    image: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-z-flip-6-xanh-duong-6_2.png",
    title: "Samsung Galaxy M55 (12GB 256GB)",
    price: "10.490.000\u0111",
    oldPrice: "12.690.000\u0111",
    sMemberDiscount: "105.000\u0111",
    installment: "600.000\u0111",
    rating: 5,
  },
  {
    discount: "15%",
    image: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-z-flip-6-xanh-duong-6_2.png",
    title: "iPhone 15 128GB | Ch\u00EDnh h\u00E3ng VN/A",
    price: "19.590.000\u0111",
    oldPrice: "22.990.000\u0111",
    sMemberDiscount: "196.000\u0111",
    installment: "600.000\u0111",
    rating: 5,
  },
  {
    discount: "18%",
    image: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-z-flip-6-xanh-duong-6_2.png",
    title: "Xiaomi Redmi Note 13 Pro 4G",
    price: "5.990.000\u0111",
    oldPrice: "7.290.000\u0111",
    sMemberDiscount: "60.000\u0111",
    installment: "200.000\u0111",
    rating: 5,
  },
  {
    discount: "13%",
    image: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-z-flip-6-xanh-duong-6_2.png",
    title: "iPhone 15 Plus 128GB | Ch\u00EDnh h\u00E3ng VN/A",
    price: "22.590.000\u0111",
    oldPrice: "25.990.000\u0111",
    sMemberDiscount: "226.000\u0111",
    installment: "600.000\u0111",
    rating: 5,
  },
  {
    discount: "9%",
    image: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-z-flip-6-xanh-duong-6_2.png",
    title: "Xiaomi POCO M6 (6GB 128GB)",
    price: "3.890.000\u0111",
    oldPrice: "4.290.000\u0111",
    sMemberDiscount: "37.000\u0111",
    installment: "200.000\u0111",
    rating: 5,
  },
  {
    discount: "10%",
    image: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-z-flip-6-xanh-duong-6_2.png",
    title: "Xiaomi Redmi Note 13 (6GB 128GB)",
    price: "4.390.000\u0111",
    oldPrice: "4.890.000\u0111",
    sMemberDiscount: "44.000\u0111",
    installment: "200.000\u0111",
    rating: 5,
  },
  {
    discount: "3%",
    image: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-z-flip-6-xanh-duong-6_2.png",
    title: "Infinix Note 40 Pro 8GB 256GB",
    price: "5.790.000\u0111",
    oldPrice: "5.990.000\u0111",
    sMemberDiscount: "58.000\u0111",
    installment: "200.000\u0111",
    rating: 5,
  },
];

export default function Home() {
  console.log(menuData.menuData);
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
      <div className="max-w-[1200px] mx-auto">
        <div className="top-home h-[480px]  mx-auto flex transition-all">
          <div className="main-menu w-1/5 hidden xs:block min-w-[180px] h-full rounded-md border shadow-lg duration-300">
            <div className="cascading-menu flex flex-col">
              {menu.map((item, index) => {
                return (
                  <div className="flex justify-between items-center hover:cursor-pointer hover:bg-gray-200 px-4 py-2 ">
                    <Link
                      to={item.url}
                      key={index}
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
          <div className="">
            <div className="flex flex-wrap gap-2 mb-4">
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
                "Xem t\u1EA5t c\u1EA3",
              ].map((brand) => (
                <Button key={brand} variant="outline" className="px-4 py-2">
                  {brand}
                </Button>
              ))}
            </div>
            <div>
              <SwiperWrapper items={featuredProducts} />
            </div>
          </div>
        </div>
        <div className="block-featured-product my-4">
          <div className="">
            <div className="flex flex-wrap gap-2 mb-4">
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
                "Xem t\u1EA5t c\u1EA3",
              ].map((brand) => (
                <Button key={brand} variant="outline" className="px-4 py-2">
                  {brand}
                </Button>
              ))}
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
