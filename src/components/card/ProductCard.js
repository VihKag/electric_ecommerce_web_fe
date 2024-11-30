import React from "react";
import { Card } from "antd";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatCurrency } from "../../utils/currencyUtils";
import { useNavigate } from "react-router-dom";
import { convertToSlug } from "../../utils/convertUltils";
function ProductCard({ product }) {
  const navigate = useNavigate();
  const handleProductClick = (product) => {
    navigate(`/product/${product._id}`);
  };

  return (
    <>
      <Card
        className="relative rounded-lg shadow-lg border-2 cursor-pointer min-h-[336px] min-w-[180px] z-10"
        onClick={() => {
          handleProductClick(product);
        }}
        styles={{
          body: { padding: "12px" ,
          },
        }}
      >
        {/* Image Section */}
        <div className="flex justify-center mx-auto size-30 md:size-44 hover:scale-105 transform-origin transition-all">
          <img
            src={product.images[0]}
            alt={product.name}
            className="object-contain w-full"
          />
        </div>

        {/* Product Name */}
        <p className="test-xs md:text-sm font-semibold min-h-12 py-1">
          {product.name}
        </p>

        {/* Price Section */}
        <div className="flex items-baseline mb-2">
          <div className="text-red-600 text-sm sm:text-base font-bold mr-2 whitespace-nowrap">
            {formatCurrency(
              product.discPrice ? product.discPrice : product.initPrice
            )}
          </div>
          <div
            className={`${
              product.discPrice ? "" : "hidden"
            } text-gray-500 text-xs sm:text-sm font-bold line-through text-discount`}
          >
            {formatCurrency(product.discPrice ? product.initPrice : null)}
          </div>
        </div>

        {/* Colors Section */}
        <div className="flex items-baseline mt-2 mb-2 overflow-x-hidden">
          {product.colors?.map((variant, index) => (
            <div key={index}>
              <div className="text-gray-500 text-xs border rounded-md p-1 mr-1">
                {variant}
              </div>
            </div>
          ))}
        </div>

        {/* Rating and Favorite Section */}
        <div className="absolute bottom-2 left-0 right-0 flex items-center justify-between px-[12px]">
          <div className="flex items-center">
            {Array.from({ length: product.rating }).map((_, i) => (
              <FontAwesomeIcon
                icon={faStar}
                key={i}
                className="text-yellow-500 w-4 h-4"
              />
            ))}
          </div>
          <div
            className="flex items-center gap-1 hover:animate-blink z-40"
            onClick={(event) => {
              event.stopPropagation();
              console.log("love-rating");
            }}
          >
            <div className="font-semibold min-w-fit text-secondary">
              Yêu thích
            </div>
            <FontAwesomeIcon
              icon={faHeart}
              className="w-5 h-5 text-sale hover:scale-110"
            />
          </div>
        </div>
      </Card>
    </>
  );
}
export default ProductCard;
