import React, { useEffect, useMemo, useState } from "react";
import Carousel from "../../../components/carousel/Carousel";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import SwiperWrapper from "../../../components/swiper/Swiper";
import { commonService, productService } from "../../../services/apiService";
import { convertToSlug } from "../../../utils/convertUltils";
import { BannerSkeleton, CategorySkeleton, ProductGroupSkeleton } from "../../../components/skeleton/HomeSkeleton";


export default function Home() {
  const navigate = useNavigate();
  const [productGroups, setProductGroups] = useState();
  const [banners, setBanners] = useState();
  const [categories, setCategories] = useState();
  const [loading, setLoading] = useState(true);
  const fetchHome = async () => {
    try {
      const response = await productService.getHomePage();
      const bannersResponse = await commonService.getBanners();
      console.log("banners: ",bannersResponse.data.data);
      setBanners(bannersResponse.data.data);
      console.log("data home page:", response.data);
      setProductGroups(response.data.data);
      const categories = response.data.data.map(item => item.category);
      setCategories(categories);
    } catch (error) {
      console.log(error.message);
    } finally{
       setLoading(false);
    }
  };

  useEffect(() => {
    fetchHome();
  }, []);
  const handleClickMoreButton = (productGroup) => {
    navigate(`category/${productGroup.category._id}`);
  };
  return (
    <div className="max-w-[1200px] container">
      <div className="top-home sm:h-[480px] mx-auto flex transition-all">
        <div className="main-menu w-1/5 hidden sm:block min-w-[180px] h-full rounded-md border shadow-lg duration-300">
          {loading ? (
            <CategorySkeleton />
          ) : (
            <div className="cascading-menu flex flex-col gap-1">
              {categories?.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center hover:cursor-pointer hover:bg-gray-200 px-4 py-2"
                >
                  <Link
                    to={`category/${item._id}`}
                    className="hover:text-red-500 font-bold text-gray text-lg"
                  >
                    {item.name}
                  </Link>
                  <FontAwesomeIcon icon={faChevronRight} color="#374151" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative slide-banner flex-1 sm:ml-2 rounded-md h-full">
          {loading ? <BannerSkeleton /> : <Carousel slides={banners} autoPlayInterval={3000} />}
        </div>
      </div>

      <div className="block-featured-product my-4">
        {loading ? (
          [...Array(3)].map((_, index) => <ProductGroupSkeleton key={index} />)
        ) : (
          productGroups?.map((productGroup, index) => (
            <div key={index} className="product-feature mt-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-center">
                  {productGroup.category.name}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {productGroup.brands.map((brand, index) => (
                    <button
                      key={index}
                      className="px-2 text-sm py-1 bg-gray-100 font-normal border border-gray-300 rounded-md hover:bg-white"
                      onClick={() =>
                        navigate(
                          `/category/${convertToSlug(productGroup.category._id)}?brand=${convertToSlug(brand.name)}`
                        )
                      }
                    >
                      {brand.name}
                    </button>
                  ))}
                  <button
                    onClick={() => handleClickMoreButton(productGroup)}
                    className="px-2 text-sm py-1 bg-gray-100 font-normal border border-gray-300 rounded-md hover:bg-white"
                  >
                    Xem thêm
                  </button>
                </div>
              </div>
              <SwiperWrapper items={productGroup.products} className="my-8" />
            </div>
          ))
        )}
      </div>
    </div>
  );
}