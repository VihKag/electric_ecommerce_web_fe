import React, { useState } from "react";
import "swiper/css";
import ThumbsGallery from "../../../components/thumbs/Thumbs";
import { product } from "../../../data";
import ProductReviews from "../../../components/product/ProductPreviews";
import ProductSummary from "./ProductSpecificationsSummary";
import ProductInformation from "../../../components/product/ProductInformation";
import ProductEvents from "./ProductEvents";
import RecommendedProducts from "../../../components/product/RecommendedProduct";
import ProductQuestions from "../../../components/product/ProductQuestions";
import ProductDescription from "../../../components/product/ProductDescription";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Button, Modal } from "antd";
const ProductPage = () => {
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const handleVariantSelect = (variant) => {
    setSelectedVariant(variant);
    setSelectedColor(variant.color[0]); // Khi chọn variant, chọn màu đầu tiên của variant đó mặc định
  };

  // Hiển thị màu khi variant được chọn
  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  // Hàm để mở modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Hàm để đóng modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{product[0].title}</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Left column */}
        <div className="md:w-3/5">
          <div className="bg-gray-200 rounded-lg mb-4">
            <ThumbsGallery />
          </div>
          <div className="">
            <ProductInformation />
          </div>
        </div>

        {/* Right column */}
        <div className="md:w-1/3">

          <>
            <div className="flex items-center mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FontAwesomeIcon
                    key={star}
                    icon={faStar}
                    className="text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <span className="ml-2">1 đánh giá</span>
              <button className="ml-4 text-blue-600">+ So sánh</button>
            </div>

            {/* Chọn variant */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              {product[0].variants.length > 0 &&
                product[0].variants.map((variant, index) => (
                  <button
                    key={index}
                    className={`p-2 border rounded text-xs ${
                      selectedVariant === variant
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    onClick={() => handleVariantSelect(variant)}
                  >
                    <div className="inline-block">{variant.storage}</div>
                    <div className="font-bold">{variant.price}đ</div>
                  </button>
                ))}
            </div>

            {/* Chọn màu khi variant đã chọn */}
            {selectedVariant && (
              <div className="mb-4">
                <h3 className="font-bold mb-2">Chọn màu</h3>
                <div className="grid grid-cols-3 gap-4">
                  {selectedVariant.color.map((color, index) => (
                    <button
                      key={index}
                      className={`p-2 border rounded ${
                        selectedColor === color
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      onClick={() => handleColorSelect(color)}
                    >
                      <div className="mx-auto mb-1">
                        <span>{color.colorName}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Giá tiền */}
            <div className="bg-gray-100 p-4 rounded mb-4">
              <div className="flex justify-between">
                <span>
                  {selectedVariant ? selectedVariant.price : product.price}đ
                </span>
                <span className="font-bold">{product.oldPrice}đ</span>
              </div>
              <div className="text-sm">Khi trả cũ lên đời</div>
            </div>

            <button className="w-full bg-sale text-white py-2 rounded">
              MUA NGAY
            </button>
          </>


              <div className="specifications-summary text-text border p-2 mt-4">
      <h2>Thông số kỹ thuật</h2>
      {/* Tóm tắt thông số */}
      <ul>
        <li className="p-2 flex justify-between items-center">
          <div>Màn hình</div>
          <p>{product[0].Specifications.display.screen}</p>
        </li>
        <li className="p-2 flex justify-between items-center">
          <div>Camera chính</div>
          <p>{product[0].Specifications.camera.camera}</p>
        </li>
        <li className="p-2 flex justify-between items-center">
          <div>Ram - Bộ nhớ</div>
          <p>
            {product[0].Specifications.storage.ram} -{" "}
            {product[0].Specifications.storage.internal_storage}
          </p>
        </li>
        <li className="p-2 flex justify-between items-center">
          <div>Pin</div>
          <p>{product[0].Specifications.battery.battery}</p>
        </li>
        <li className="p-2 flex justify-between items-center">
          <div>Hệ điều hành</div>
          <p>{product[0].Specifications.operating_system.android}</p>
        </li>
      </ul>

      <Button className="w-full" onClick={showModal}>Xem đầy đủ thông số</Button>

      <Modal
        title="Thông số kỹ thuật đầy đủ"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="close" onClick={handleCancel}>
            Đóng
          </Button>,
        ]}
      >
        <div className="specifications-summary text-text">
          <h2>Thông số kỹ thuật</h2>
          {/* Tóm tắt thông số */}
          <ul>
            <li className="p-2 flex justify-between items-center">
              <div>Màn hình</div>
              <p>{product[0].Specifications.display.screen}</p>
            </li>
            <li className="p-2 flex justify-between items-center">
              <div>Công nghệ màn hình</div>
              <p>{product[0].Specifications.display.technology}</p>
            </li>
            <li className="p-2 flex justify-between items-center">
              <div>Camera chính</div>
              <p>{product[0].Specifications.camera.camera}</p>
            </li>
            <li className="p-2 flex justify-between items-center">
              <div>Camera góc siêu rộng</div>
              <p>{product[0].Specifications.camera.ultra_wide_camera}</p>
            </li>
            <li className="p-2 flex justify-between items-center">
              <div>RAM</div>
              <p>{product[0].Specifications.storage.ram}</p>
            </li>
            <li className="p-2 flex justify-between items-center">
              <div>Bộ nhớ trong</div>
              <p>{product[0].Specifications.storage.internal_storage}</p>
            </li>
            <li className="p-2 flex justify-between items-center">
              <div>Pin</div>
              <p>{product[0].Specifications.battery.battery}</p>
            </li>
            <li className="p-2 flex justify-between items-center">
              <div>Sạc nhanh</div>
              <p>{product[0].Specifications.battery.charging_technology}</p>
            </li>
          </ul>
        </div>
      </Modal>
    </div>
        </div>
      </div>

      <div>
        <ProductDescription />
      </div>

      <div className="my-4 border p-4 rounded-md">
        <div className="text-primary font-bold text-2xl mb-2 text-center">
          CÂU HỎI THƯỜNG GẶP
        </div>
        <ProductQuestions />
      </div>

      <div>
        <RecommendedProducts />
      </div>

      <div>
        <ProductReviews />
      </div>
    </div>
  );
};

export default ProductPage;
