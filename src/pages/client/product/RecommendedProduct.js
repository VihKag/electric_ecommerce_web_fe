import React from 'react';
import ProductCard from '../../../components/card/ProductCard';
import { product } from '../../../data';
const RecommendedProducts = () => {
  return (
    <>
        <div className="flex flex-wrap">
          {product.map((item, index) => {
            return (
              <div key={index} className="lg:w-1/4 xl:w-1/5 sm:w-1/3 xs:w-1/2 w-full pr-2 py-1">
                <ProductCard product={item} />
              </div>
            );
          })}
        </div>
    </>
  );
};

export default RecommendedProducts;