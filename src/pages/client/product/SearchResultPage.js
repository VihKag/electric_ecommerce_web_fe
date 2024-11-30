import React, { useState, useEffect } from "react";
import { productService } from "../../../services/apiService";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../../components/card/ProductCard";

const SearchResultPage = () => {
  const [searchParams] = useSearchParams();
  const [allProducts, setAllProducts] = useState([]); // Danh sách tất cả sản phẩm từ API
  const [displayedProducts, setDisplayedProducts] = useState([]); // Sản phẩm hiển thị trên giao diện
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const itemsPerPage = 10; // Số sản phẩm hiển thị mỗi trang
  const keyword = searchParams.get("keyword") || "";

  // Gọi API lấy danh sách sản phẩm
  const fetchSearchedProducts = async () => {
    setLoading(true);
    try {
      const response = await productService.getSearchedProducts({
        params: { keyword },
      });

      setAllProducts(response.data.products || []); // Lưu toàn bộ sản phẩm
      setCurrentPage(1); // Reset về trang đầu tiên
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Cập nhật sản phẩm hiển thị khi `allProducts` hoặc `currentPage` thay đổi
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage;
    setDisplayedProducts(allProducts.slice(0, endIndex));
  }, [allProducts, currentPage]);

  // Gọi API khi `keyword` thay đổi
  useEffect(() => {
    fetchSearchedProducts();
  }, [keyword]);

  // Xử lý khi nhấn "Tải thêm"
  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">
        Có <span className="text-primary">{allProducts.length}</span> kết quả tìm
        kiếm cho: "{keyword}"
      </h1>

      {/* Hiển thị danh sách sản phẩm */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-4">
        {displayedProducts?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {/* Nút "Tải thêm" */}
      {displayedProducts.length < allProducts.length && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
            disabled={loading}
          >
            {loading ? "Đang tải..." : "Tải thêm"}
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchResultPage;
