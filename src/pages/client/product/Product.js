import React, { useState } from "react";
import "swiper/css";
import ThumbsGallery from "../../../components/thumbs/Thumbs";
import { product } from "../../../data";
import ProductReviews from "./ProductPreviews";
import ProductSummary from "./ProductSpecificationsSummary";
import ProductInformation from "./ProductInformation";
import ProductEvents from "./ProductEvents";
import RecommendedProducts from "./RecommendedProduct";
import ProductQuestions from "./ProductQuestions";
import ProductDescription from "./ProductDescription";
const ProductPage = () => {


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
          <ProductEvents product={product[0]}/>
          <ProductSummary product={product[0]} />
        </div>
      </div>

      <div>
        <ProductDescription/>
      </div>

      <div className="my-4 border p-4 rounded-md">
        <div className="text-primary font-bold text-2xl mb-2 text-center">CÂU HỎI THƯỜNG GẶP</div>
        <ProductQuestions/>
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
