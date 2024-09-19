import React, { useState } from "react";
import "swiper/css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ThumbsGallery from "../../../components/thumbs/Thumbs";
import { product } from "../../../data";
import ProductReviews from "./ProductPreviews";
import ProductSummary from "./ProductSpecificationsSummary";
import ProductInformation from "./ProductInformation";
import ProductEvents from "./ProductEvents";
import RecommendedProducts from "./RecommendedProduct";
const ProductPage = () => {


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
            <ProductInformation />
          </div>
        </div>

        {/* Right column */}
        <div className="md:w-1/3">
          <ProductEvents product={product[0]}/>
          <ProductSummary product={product[0]} />
        </div>
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
