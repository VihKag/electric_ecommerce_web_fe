import React from "react";
import { Badge, Card } from "antd";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function ProductCard({ product }) {
  return (
    <>
      <Card bodyStyle={{padding: '24px 8px 8px'}} className="relative rounded-lg shadow-lg border-2">
        <Badge variant="secondary" className="absolute top-2 left-2">
          Giảm {product.discount}
        </Badge>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover mb-2"
        />
        <p className="text-sm font-semibold h-16">{product.title}</p>
        <div className="flex items-center gap-4 mt-2 mb-2">
          <span className="text-red-600 text-base font-bold">
            {product.price}
          </span>
          <span className="line-through text-sm text-secondary font-semibold">
            {product.oldPrice}
          </span>
        </div>
        <div className="text-xs text-text mb-2">
          Member giảm thêm{" "}
          <span className="text-sale font-bold text-sm">
            {product.sMemberDiscount}
          </span>
        </div>
        <div className="text-xs text-text mb-4 border bg-gray-100">
          Không phí chuyển đổi khi trả góp 0% qua thẻ tín dụng kỳ hạn 3-6-9-12
          tháng
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {Array.from({ length: product.rating }).map((_, i) => (
              <FontAwesomeIcon
                icon={faStar}
                key={i}
                className="text-yellow-500 w-4 h-4"
              />
            ))}
          </div>
          <div className="flex items-center gap-1">
            <span className="font-semibold  text-secondary">Yêu thích</span>
            <FontAwesomeIcon
              icon={faHeart}
              className="w-5 h-5 text-sale hover:scale-110 hover:animate-blink"
            />
          </div>
        </div>
      </Card>
    </>
  );
}
export default ProductCard;
