import React, { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Button, Dropdown, Menu, Pagination } from "antd";
import { v4 as uuidv4 } from "uuid";
import "antd/dist/reset.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownShortWide,
  faArrowDownWideShort,
  faChevronDown,
  faCircleXmark,
  faEye,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import useButton from "../../../hooks/useButton";
import { product } from "../../../data";
import ProductCard from "../../../components/card/ProductCard";

const categories = [
  { name: "Chơi game", image: "/path/to/game-image.jpg" },
  { name: "Điện thoại gập", image: "/path/to/fold-image.jpg" },
  { name: "Chụp ảnh đẹp", image: "/path/to/camera-image.jpg" },
  { name: "Livestream", image: "/path/to/livestream-image.jpg" },
  { name: "Dung lượng lớn", image: "/path/to/big-storage-image.jpg" },
  { name: "Pin trâu", image: "/path/to/big-battery-image.jpg" },
  { name: "Cấu hình cao", image: "/path/to/high-config-image.jpg" },
  { name: "Điện thoại AI", image: "/path/to/ai-phone-image.jpg" },
  { name: "Điện thoại phổ thông", image: "/path/to/regular-phone-image.jpg" },
];
const brands = [
  {
    name: "Apple",
    image:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:30/plain/https://cellphones.com.vn/media/tmp/catalog/product/f/r/frame_59.png",
  },
  {
    name: "Samsung",
    image:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:30/plain/https://cellphones.com.vn/media/tmp/catalog/product/f/r/frame_60.png",
  },
  {
    name: "Xiaomi",
    image:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:30/plain/https://cellphones.com.vn/media/tmp/catalog/product/f/r/frame_61.png",
  },
  {
    name: "Oppo",
    image:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:30/plain/https://cellphones.com.vn/media/tmp/catalog/product/f/r/frame_62.png",
  },
  {
    name: "Realme",
    image:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:30/plain/https://cellphones.com.vn/media/tmp/catalog/product/f/r/frame_63.png",
  },
  {
    name: "Nokia",
    image:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:30/plain/https://cellphones.com.vn/media/tmp/catalog/product/f/r/frame_37_1.png",
  },
  {
    name: "OnePlus",
    image:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:30/plain/https://cellphones.com.vn/media/tmp/catalog/product/f/r/frame_65.png",
  },
  {
    name: "Infinix",
    image:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:30/plain/https://cellphones.com.vn/media/tmp/catalog/product/i/n/infinixlogo.png",
  },
  {
    name: "Asus",
    image:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:30/plain/https://cellphones.com.vn/media/tmp/catalog/product/f/r/frame_67.png",
  },
  {
    name: "Vivo",
    image:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:30/plain/https://cellphones.com.vn/media/tmp/catalog/product/t/_/t_i_xu_ng_67_.png",
  },
];

const filters = [
  {
    key: 0,
    filter: "Nhu cầu sử dụng",
    items: [
      "Chơi game",
      "Điện thoại gập",
      "Chụp ảnh đẹp",
      "Livestream",
      "Dung lượng lớn",
      "Pin trâu",
      "Cấu hình cao",
      "Điện thoại AI",
      "Điện thoại phổ thông",
    ],
  },
  {
    key: 1,
    filter: "Chip xử lý",
    items: ["Snapdragon", "Exynos", "MediaTek", "Apple A-series", "Kirin"],
  },
  {
    key: 2,
    filter: "Dung lượng RAM",
    items: ["2GB", "4GB", "6GB", "8GB", "12GB", "16GB"],
  },
  {
    key: 3,
    filter: "Bộ nhớ trong",
    items: ["32GB", "64GB", "128GB", "256GB", "512GB", "1TB"],
  },
  {
    key: 4,
    filter: "Loại điện thoại",
    items: ["Điện thoại thông minh", "Điện thoại phổ thông", "Điện thoại gập"],
  },
  {
    key: 5,
    filter: "Tính năng đặc biệt",
    items: [
      "Chống nước",
      "Chống bụi",
      "Hỗ trợ 5G",
      "Sạc nhanh",
      "Cảm biến vân tay",
      "Nhận diện khuôn mặt",
    ],
  },
  {
    key: 6,
    filter: "Giá",
    items: [
      "Dưới 3 triệu",
      "3 - 6 triệu",
      "6 - 10 triệu",
      "10 - 15 triệu",
      "Trên 15 triệu",
    ],
  },
];

export default function CategoryPage() {
  const [selectedItems, setSelectedItems] = useState([
    "Nhu cầu sử dụng: chơi game",
  ]);
  const [filterBtns, setFilterBtns] = useState([]);
  const { buttonRef, handleFocus, handleClick } = useButton();

  const handleClickFilter = (id) => {
    setFilterBtns((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSelectedItem = (item) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };
  const handleCancel = () => {
    setSelectedItems([]);
  };

  const CustomMenu = (items) => ({
    items: [
      {
        key: "all-items",
        label: (
          <div className="flex flex-wrap mr-2 max-w-96 w-fit">
            {items.map((item, index) => (
              <Button
                key={item}
                onClick={(e) => {
                  e.stopPropagation();
                  handleClickFilter(item);
                }}
                type="text"
                className={`mr-2 mb-2 hover:!text-red-500 ${
                  filterBtns.includes(item)
                    ? "border border-red-500 text-red-500"
                    : ""
                }`}
              >
                {item}
              </Button>
            ))}
          </div>
        ),
      },
    ],
  });
  return (
    <div className="max-w-[1200px] container">
      <div>
        {/* Brand logos */}
        <div className="flex mb-6 max-w-[1200px] flex-wrap">
          {brands.map((brand, index) => (
            <Link
              key={index}
              to={brand.name}
              className="border rounded-sm h-8 justify-center flex py-[2px] px-1 mb-2 mr-2 items-center"
            >
              <img
                src={brand.image}
                alt={brand.name}
                className="h-5 min-w-[98px]"
              />
            </Link>
          ))}
        </div>

        <label className="text-lg text-text font-bold ">
          Chọn theo tiêu chí
        </label>
        <div className="flex flex-wrap gap-2 mb-4">
          {filters.map((item, index) => {
            const isAnyItemSelected = item.items.some((subItem) =>
              filterBtns.includes(subItem)
            );
            return (
              <Dropdown
                trigger={["click"]}
                items={CustomMenu(item.items)}
                key={index}
                className="flex-grow max-w-fit"
              >
                <Button
                  ref={buttonRef}
                  onFocus={handleFocus}
                  onClick={handleClick}
                  type="text"
                  className={`
                  active:text-red-500 active:border-red-500 
                  hover:!text-red-500
                  focus:border-red-500 focus:text-red-500 
                  border border-gray-300 bg-gray-100
                  ${isAnyItemSelected ? "border-red-500 text-red-500" : ""}
                `}
                >
                  {item.filter} <FontAwesomeIcon icon={faChevronDown} />
                </Button>
              </Dropdown>
            );
          })}
        </div>

        {selectedItems && selectedItems.length > 0 && (
          <>
            <label className="text-lg text-text font-bold">Đang lọc theo</label>
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedItems.map((item, index) => (
                <Button danger key={index}>
                  <FontAwesomeIcon icon={faCircleXmark} /> {item}
                </Button>
              ))}
              <Button danger key="del">
                <FontAwesomeIcon icon={faCircleXmark} /> Bỏ tất cả
              </Button>
            </div>
          </>
        )}

        <label className="text-lg text-text font-bold">Sắp xếp theo</label>
        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-wrap space-x-2">
            <Button
              type="text"
              className="active:text-red-500 active:border-red-500 focus:border-red-500 focus:text-red-500 border border-gray-300 bg-gray-100 hover:!text-red-500"
            >
              <FontAwesomeIcon icon={faArrowDownWideShort} /> Giá Cao - Thấp
            </Button>
            <Button
              type="text"
              className="active:text-red-500 active:border-red-500 focus:border-red-500 focus:text-red-500 border border-gray-300 bg-gray-100 hover:!text-red-500"
            >
              <FontAwesomeIcon icon={faArrowDownShortWide} /> Giá Thấp - Cao
            </Button>
            <Button
              type="text"
              className="active:text-red-500 active:border-red-500 focus:border-red-500 focus:text-red-500 border border-gray-300 bg-gray-100 hover:!text-red-500"
            >
              <FontAwesomeIcon icon={faTag} /> Khuyến Mãi Hot
            </Button>
            <Button
              type="text"
              className="active:text-red-500 active:border-red-500 focus:border-red-500 focus:text-red-500 border border-gray-300 bg-gray-100"
            >
              <FontAwesomeIcon icon={faEye} /> Xem nhiều
            </Button>
          </div>
        </div>
      </div>

      <div>
        <div className="flex flex-wrap">
          {product.map((item, index) => {
            return (
              <div key={index} className="lg:w-1/4 xl:w-1/5 sm:w-1/3 xs:w-1/2 w-full pr-2 py-1">
                <ProductCard product={item} />
              </div>
            );
          })}
        </div>
        <div className="my-6">
          <Pagination
            align="center"
            responsive={true}
            showSizeChanger
            defaultCurrent={1}
            total={400}
            className="custom-pagination"
          />
        </div>
      </div>
    </div>
  );
}
