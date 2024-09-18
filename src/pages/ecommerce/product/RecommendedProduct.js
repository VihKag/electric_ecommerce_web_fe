import React from 'react';
import ProductCard from '../../../components/card/ProductCard';
const RecommendedProducts = ({ products }) => {
  return (
    <>
    {products.length > 0 && products.map((product) =>{
        return (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        );
      })
    }
    </>
  );
};

export default RecommendedProducts;