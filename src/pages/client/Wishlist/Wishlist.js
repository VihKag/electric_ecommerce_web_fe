import React, { useEffect, useState } from "react";
import axios from "axios";
import { commonService } from "../../../services/apiService";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import ProductCard from "../../../components/card/ProductCard";

const Wishlist = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [products, setProducts] = useState([]);
  const fetchFavoritedProducts = async () => {
    try {
      // Lấy danh sách sản phẩm từ backend
      const response = await commonService.getFavouriteProduct(user.id);
      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
      return;
    }
  };
  useEffect(() => {
    if (!user) {
      message.info("Vui lòng đăng nhập!");
      navigate("/auth/login");
      return;
    } else {
      fetchFavoritedProducts();
    }
  }, []);
  return (
    <div className="container mx-auto p-4 max-w-[1200px]">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Các sản phẩm yêu thích
      </h2>
      <div className="mb-6">
        {products?.length > 0 ? (
          <div>
            <div className="flex flex-wrap">
              {products.map((item, index) => (
                <div
                  key={item._id || index}
                  className="lg:w-1/4 xl:w-1/5 sm:w-1/3 xs:w-1/2 w-full pr-2 py-1"
                >
                  <ProductCard product={item} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            Không có sản phẩm nào.
          </p>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
