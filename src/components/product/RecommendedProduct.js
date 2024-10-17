import React from 'react';
import ProductCard from '../card/ProductCard';
import { product } from '../../data';
import SwiperWrapper from '../swiper/Swiper';
const featuredProducts = product.map((product, index) => (
  <ProductCard key={index} product={product}/>
));
const RecommendedProducts = () => {
  return (
    <>
      <h2 className="text-xl font-semibold text-text">Sản phẩm tương tự</h2>
      <SwiperWrapper default={true} items={featuredProducts} />
    </>
  );
};

export default RecommendedProducts;