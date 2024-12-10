import React, { useCallback, useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Breadcrumb, Button, Skeleton } from "antd";
import "antd/dist/reset.css";
import { useParams, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownShortWide,
  faArrowDownWideShort,
} from "@fortawesome/free-solid-svg-icons";
import { HomeOutlined } from "@ant-design/icons";
import ProductCard from "../../../components/card/ProductCard";
import { categoryService } from "../../../services/apiService";

export default function CategoryPage() {
  const { categoryId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const brand = searchParams.get("brand"); // Lấy giá trị của 'brand'
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [filterSpecsOptions, setFilterSpecsOptions] = useState([]);
  const [category, setCategory] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({});
  const [loading, setLoading] = useState(true); // Trạng thái loading cho sản phẩm
  const [openDropdown, setOpenDropdown] = useState(null); // Trạng thái lưu dropdown đang mở

  const toggleFilter = (key, value) => {
    setSelectedFilters((prev) => {
      const currentFilters = prev[key] || [];
      const newFilters = currentFilters.includes(value)
        ? currentFilters.filter((v) => v !== value)
        : [...currentFilters, value];

      return {
        ...prev,
        [key]: newFilters,
      };
    });
  };

  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(selectedFilters).forEach(([key, values]) => {
      if (Array.isArray(values)) {
        // If the value is an array (filters like brand, specs), join them as a string
        params.set(key, values.join(","));
      } else {
        // For non-array values (like sort)
        params.set(key, values);
      }
    });
    setSearchParams(params);
  }, [selectedFilters, setSearchParams]);

  const toggleDropdown = (key) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  const fetchCategoryData = useCallback(async () => {
    try {
      const [productRes, brandRes, categoryRes, filterRes] = await Promise.all([
        categoryService.getProductByCategoryId(categoryId),
        categoryService.getAllBrandsById(categoryId),
        categoryService.getCategoryById(categoryId),
        categoryService.getFilterOptions(categoryId),
      ]);

      setProducts(productRes.data.data);
      setBrands(brandRes.data.data);
      setCategory(categoryRes.data.data);
      setFilterSpecsOptions(filterRes.data.data.filters);
    } catch (error) {
      console.error("Failed to fetch category data:", error);
    }
  }, [categoryId]);

  const fetchFilteredProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = Object.fromEntries(searchParams.entries());
      const filters = {};
      for (const [key, value] of Object.entries(params)) {
        if (
          !["brand", "sort", "page", "limit", "minPrice", "maxPrice"].includes(
            key
          )
        ) {
          filters[key] = value.split(",");
        }
      }

      const response = await categoryService.getProductByCategoryId(
        categoryId,
        {
          params: {
            ...filters,
            sort: params.sort || null,
            page: params.page || 1,
            minPrice: params.minPrice || null,
            maxPrice: params.maxPrice || null,
            limit: params.limit || null,
            brand: params.brand || null,
          },
        }
      );
      setProducts(response.data.data);
    } catch (error) {
      console.error("Failed to fetch filtered products:", error);
    } finally {
      setLoading(false);
    }
  }, [categoryId, searchParams]);

  const handleSortChange = (sortValue) => {
    // Update the selectedFilters state with the new sort value
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      sort: sortValue,
    }));
  };
  const handleBrandChange = (sortValue) => {
    // Update the selectedFilters state with the new sort value
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      brand: sortValue,
    }));
  };

  useEffect(() => {
    fetchCategoryData();
  }, [fetchCategoryData]);

  useEffect(() => {
    fetchFilteredProducts();
  }, [fetchFilteredProducts]);

  return (
    <div className="max-w-[1200px] container">
      <div className="my-2">
        <Breadcrumb
          className="text-base font-medium"
          items={[
            {
              href: "/",
              title: <HomeOutlined />,
            },
            {
              href: `/category/${category._id}`,
              title: (
                <>
                  <span>{category.name}</span>
                </>
              ),
            },
            {
              title: brand,
            },
          ]}
        />
      </div>
      <div>
        {brands?.length > 0 && (
          <div>
            {/* Brand logos */}
            <label className="text-lg text-text font-bold ">Thương hiệu</label>
            <div className="flex mb-4 max-w-[1200px] flex-wrap gap-4">
              {brands.map((brand, i) => {
                return (
                  <button
                    key={brand._id}
                    onClick={() => handleBrandChange(brand.name)}
                    className="flex items-center hover:text-gray-900"
                  >
                    {/* Thêm thẻ div với nền trắng bao quanh ảnh */}
                    <div className="bg-white w-20 h-10 p-1 border rounded-md justify-center flex items-center">
                      <img
                        className="w-auto h-8 object-contain"
                        src={brand.images}
                        alt={brand.name}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {filterSpecsOptions.length > 0 && (
          <div>
            <label className="text-lg text-text font-bold ">
              Chọn theo tiêu chí
            </label>
            <div className="flex flex-wrap gap-4 my-2">
              <div className="w-full">
                <div className="flex flex-wrap gap-4">
                  {filterSpecsOptions.map((filter) => (
                    <div key={filter._id} className="relative">
                      <button
                        onClick={() => toggleDropdown(filter.key)}
                        className={`px-3 py-1 text-sm bg-gray-100 border rounded-lg hover:bg-gray-50 flex items-center gap-2 ${
                          selectedFilters[filter.key]?.length
                            ? "ring-primary ring-1 text-primary bg-red-50"
                            : ""
                        }`}
                      >
                        {filter.key}
                        <span className="text-xs">
                          {selectedFilters[filter.key]?.length
                            ? `(${selectedFilters[filter.key].length})`
                            : ""}
                        </span>
                        <svg
                          className={`w-4 h-4 transition-transform ${
                            openDropdown === filter.key ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      {openDropdown === filter.key && (
                        <div className="absolute mt-2 w-60 bg-white border rounded-lg shadow-lg z-20">
                          <div className="p-2 max-h-60 overflow-y-auto">
                            {filter.values.map((value) => (
                              <label
                                key={value}
                                className={`flex items-center gap-2 p-2 hover:bg-gray-50 cursor-pointer rounded ${
                                  selectedFilters[filter.key]?.includes(value)
                                    ? "bg-red-50 border border-red-500"
                                    : ""
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={
                                    selectedFilters[filter.key]?.includes(
                                      value
                                    ) || false
                                  }
                                  onChange={() =>
                                    toggleFilter(filter.key, value)
                                  }
                                  className="hidden"
                                />
                                <div
                                  className={`w-4 h-4 border rounded flex items-center justify-center ${
                                    selectedFilters[filter.key]?.includes(value)
                                      ? "bg-red-500 border-red-500"
                                      : "border-gray-300"
                                  }`}
                                >
                                  {selectedFilters[filter.key]?.includes(
                                    value
                                  ) && (
                                    <svg
                                      className="w-3 h-3 text-white"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                      />
                                    </svg>
                                  )}
                                </div>
                                <span className="text-sm">{value}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <label className="text-lg text-text font-bold">Sắp xếp theo</label>
        <div className="flex justify-between items-center my-2">
          <div className="flex flex-wrap space-y-2 xs:space-y-0 xs:space-x-2">
            <Button
              type="text"
              className={`${
                searchParams.get("sort") === "price_desc"
                  ? "text-red-500 border-red-500"
                  : ""
              }`}
              onClick={() => handleSortChange("price_desc")}
              icon={<FontAwesomeIcon icon={faArrowDownWideShort} />}
            >
              Giá giảm dần
            </Button>
            <Button
              type="text"
              className={`${
                searchParams.get("sort") === "price_asc"
                  ? "text-red-500 border-red-500"
                  : ""
              }`}
              onClick={() => handleSortChange("price_asc")}
              icon={<FontAwesomeIcon icon={faArrowDownShortWide} />}
            >
              Giá tăng dần
            </Button>
          </div>
        </div>
      </div>

      <div className="mb-6">
        {/* Component ProductList */}
        <ProductList products={products} loading={loading} />
      </div>
    </div>
  );
}
const ProductList = ({ products, loading }) => {
  return (
    <div>
      {loading ? (
        <Skeleton active />
      ) : (
        <div className="flex flex-wrap">
          {products.length === 0 ? (
            <div className="w-full text-primary font-semibold text-center text-2xl text-gray-500 py-20">
              Không có sản phẩm
            </div>
          ) : (
            products.map((item, index) => (
              <div
                key={item._id || index}
                className="lg:w-1/4 xl:w-1/5 sm:w-1/3 xs:w-1/2 w-full pr-2 py-1"
              >
                <ProductCard product={item} />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
