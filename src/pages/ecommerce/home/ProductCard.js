import React from 'react';
const product = {
    _id:1,
    name: "Apple MacBook Air M1 256GB 2020 | Chính hãng Apple Việt Nam",
    description: "Apple M1 | 8 nhân GPU, 8GB | 256GB | 13.3” 2K",
    price: {
      current: "18.490.000đ",
      original: "22.990.000đ",
      discount: "Giảm 20%"
    },
    discounts: [
      {
        type: "Smember",
        amount: "185.000đ"
      },
      {
        type: "S-Student",
        amount: "500.000đ"
      }
    ],
    promotions: [
      {
        type: "Trả góp 0%",
        details: "Không phí chuyển đổi khi trả góp 0% qua thẻ tín dụng kỳ hạn 3-6 tháng"
      }
    ],
    ratings: {
      stars: 5,
      reviewCount: 0
    },
    wishlist: "Yêu thích",
    imageUrl: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/macbook_5_1.png"
  };
function ProductCard (props){
    return (
        <>
            <div>
                <div className="mb-2 w-full">
                    <img src={product.imageUrl} alt={`product_`+product._id} />
                    <div>
                      <h4 className='text-gray'>{product.name}</h4>
                    </div>

                    <div>
                      <p>{product.price.current}</p>
                      <p>{product.price.original}</p>
                    </div>

                    <div>
                      {product.discounts.forEach((item,index)=>{
                        return(
                          <div key={index}>
                            <p>{item.type} giảm thêm đến</p>
                            <p>{item.amount}</p>
                          </div>
                        )
                      })}
                    </div>

                    <div>
                      <div>
                        {product.promotions[0].details}
                      </div>
                    </div>

                    <div>
                      <div>{product.ratings.stars}</div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default ProductCard;