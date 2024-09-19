import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {
    faStar,
  } from "@fortawesome/free-solid-svg-icons";
export default function ProductEvents({product}){
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
    return(
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
            {product.variants.length > 0 &&
              product.variants.map((variant, index) => (
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
    );
}