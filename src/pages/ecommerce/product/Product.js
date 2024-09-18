import React, { useState } from "react";
import "swiper/css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import ThumbsGallery from "../../../components/thumbs/Thumbs";
import { product } from "../../../data";
import ProductReviews from "./ProductPreviews";
import ProductSummary from "./ProductSpecificationsSummary";
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

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{product[0].title}</h1>

      <div className="flex flex-col md:flex-row gap-8 mb-4">
        {/* Left column */}
        <div className="md:w-3/5">
          <div className="bg-gray-200 rounded-lg mb-4">
            <ThumbsGallery />
          </div>
          <div className="border rounded-lg p-2">
            <div>
              <p className="text-base font-bold text-text">
                Thông tin sản phẩm
              </p>
            </div>
            <div>
              <div>
                Nguyên hộp, đầy đủ phụ kiện từ nhà sản suất Bảo hành pin 12
                tháng
              </div>
              <div>Máy, sạc, sách hướng dẫn</div>
              <div>
                Bảo hành 12 tháng tại trung tâm bảo hành Chính hãng. 1 đổi 1
                trong 30 ngày nếu có lỗi phần cứng từ nhà sản xuất.
              </div>
              <div>Giá sản phẩm đã bao gồm VAT</div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="md:w-1/3">
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
                {selectedVariant ? selectedVariant.price : product[0].price}đ
              </span>
              <span className="font-bold">{product[0].oldPrice}đ</span>
            </div>
            <div className="text-sm">Khi trả cũ lên đời</div>
          </div>

          <button className="w-full bg-sale text-white py-2 rounded">
            MUA NGAY
          </button>

          <ProductSummary product={product[0]}/>
        </div>
      </div>

      <div>
        <ProductReviews />
      </div>
    </div>
  );
};

export default ProductPage;
