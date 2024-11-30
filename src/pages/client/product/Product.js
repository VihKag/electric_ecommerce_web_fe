import React, { useCallback, useEffect, useState } from "react";
import "swiper/css";
import ThumbsGallery from "../../../components/thumbs/Thumbs";
import ProductReviews from "../../../components/product/ProductPreviews";
import ProductQuestions from "../../../components/product/ProductQuestions";
import ProductDescription from "../../../components/product/ProductDescription";
import { Modal } from "antd";
import { productService } from "../../../services/apiService";
import { useNavigate, useParams } from "react-router-dom";
import { formatCurrency } from "../../../utils/currencyUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import SwiperWrapper from "../../../components/swiper/Swiper";
const ProductPage = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [details, setDetails] = useState([]);
  const [relative, setRelative] = useState([]);
  const [selectedMemory, setSelectedMemory] = useState();
  const [selectedColor, setSelectedColor] = useState("");
  const [variants, setVariants] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAddToCart = async () => {
    if (!selectedVariant) {
      alert("Vui lòng chọn bộ nhớ và màu sắc!");
      return;
    }

    try {
      const payload = {
        user: "user_id_here", // Thay bằng ID người dùng thật
        product: product._id,
        quantity: quantity,
        memory: selectedVariant.memory,
        color: selectedVariant.color,
      };

      const response = "data"; // Thay bằng API thực tế

      if (response.data.success) {
        alert("Thêm vào giỏ hàng thành công!");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra khi thêm vào giỏ hàng.");
    }
  };
  // Hàm để mở modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Hàm để đóng modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const SpecsTable = () => {
    return (
      <div>
        <div className="font-bold text-xl py-1">Thông số kỹ thuật</div>
        <ul className="rounded-md border">
          {details?.map((item, index) => {
            return (
              <li
                key={index}
                className="p-2 border-b w-full !flex items-center justify-between list-none odd:bg-gray-200"
              >
                <div className="font-medium text-gray-900 w-2/5">
                  {item.details[0].key}
                </div>
                <div className="w-1/2">{item.details[0].value}</div>
              </li>
            );
          })}
        </ul>
        <button
          className="w-full p-1 border border-black rounded mt-2 hover:border-primary hover:text-primary"
          onClick={showModal}
        >
          Xem đầy đủ thông số
        </button>
      </div>
    );
  };
  const SpecsModal = () => {
    return (
      <ul className="max-h-[70vh] overflow-y-auto">
        {details?.map((item) => {
          return (
            <div key={item?.category}>
              <div className="font-bold text-lg py-2 px-1">{item.category}</div>
              <div className="border rounded-md">
                {item.details?.map((i) => {
                  return (
                    <li
                      key={i.key}
                      className="p-2 w-full !flex items-center justify-between list-none odd:bg-gray-200 "
                    >
                      <div className="font-medium text-gray-900 w-2/5">
                        {i.key}
                      </div>
                      <div className="w-1/2">{i.value}</div>
                    </li>
                  );
                })}
              </div>
            </div>
          );
        })}
      </ul>
    );
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productService.getProductById(productId);
        const relativeProducts = await productService.getRelativeProducts(
          productId
        );
        console.log(response.data.data);
        console.log(relativeProducts.data.data);
        setRelative(relativeProducts.data.data);
        setProduct(response.data.data.product);
        setDetails(response.data.data.details);
        setVariants(response.data.data.variants);

        // Mặc định chọn variant đầu tiên
        const defaultMemory = response.data.data.variants[0];
        if (defaultMemory) {
          const defaultColor = defaultMemory.variants[0];
          setSelectedMemory(defaultMemory.memory);
          setSelectedColor(defaultColor.color);
          setSelectedVariant({
            memory: defaultMemory.memory,
            color: defaultColor.color,
            variant: defaultColor,
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [productId]);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Left column */}
        <div className="md:w-3/5">
          <div className="bg-gray-200 rounded-lg mb-4">
            <ThumbsGallery thumbs={product?.images} />
          </div>
        </div>

        {/* Right column */}
        <div className="md:w-2/5">
          <div className="text-2xl font-semibold mb-4">{product.name}</div>
          <>
            {/* Thương hiệu/mã */}
            <div className="flex items-center mb-2">
              <div className="flex">
                <div className="font-semibold">Thương hiệu:</div>
                <div
                  onClick={() =>
                    navigate(
                      `/category/${product.category._id}?brand=${product.brand?._id}`
                    )
                  }
                  className="ml-2 cursor-pointer text-primary"
                >
                  {product.brand?.name}
                </div>
              </div>
              <span className="mx-2 select-none">|</span>
              {/* Đánh giá rating */}
              <div className="flex items-center">
                <div className="font-semibold">Đánh giá:</div>
                <div className="ml-2 flex items-center">
                  <h4 className="mr-1">{product.rating}</h4>
                  <span>
                    <FontAwesomeIcon icon={faStar} color="yellow" />
                  </span>
                </div>
              </div>
            </div>

            {/* variants sản phẩm */}
            <div className="mb-2">
              {/* Chọn bộ nhớ */}
              <div className="mb-2">
                <div className="flex gap-2">
                  {variants.map((variant, index) => (
                    <button
                      key={index}
                      className={`px-4 py-1 border rounded font-medium ${
                        selectedMemory === variant.memory
                          ? "ring-primary ring-1"
                          : "bg-white text-black"
                      }`}
                      onClick={() => {
                        setSelectedMemory(variant.memory);
                        const defaultColor = variant.variants[0];
                        setSelectedColor(defaultColor.color);
                        setSelectedVariant({
                          memory: variant.memory,
                          color: defaultColor.color,
                          variant: defaultColor,
                        });
                      }}
                    >
                      {variant.memory}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chọn màu sắc */}
              <div>
                <h3 className="text-lg font-semibold">Màu sắc</h3>
                <div className="flex gap-2">
                  {variants
                    .find((variant) => variant.memory === selectedMemory)
                    ?.variants.map((v, index) => (
                      <button
                        key={index}
                        className={`px-4 py-1 border rounded flex flex-col ${
                          selectedColor === v.color
                            ? "ring-primary ring-1"
                            : "bg-white text-black"
                        }`}
                        onClick={() => {
                          setSelectedColor(v.color);
                          setSelectedVariant({
                            memory: selectedMemory,
                            color: v.color,
                            variant: v,
                          });
                        }}
                      >
                        <div className="font-medium">{v.color}</div>
                        <div>{formatCurrency(v.price.initial)}</div>
                      </button>
                    ))}
                </div>
              </div>
            </div>

            <div className="rounded mb-4 flex items-baseline gap-2">
              <div className="text-sale font-semibold text-lg">
                {formatCurrency(selectedVariant.variant?.price.initial)}
              </div>
              <span className="text-discount line-through font-semibold">
                {formatCurrency(selectedVariant.variant?.price.discount)}
              </span>
            </div>

            <div className="flex gap-2">
              <button className="w-full bg-primary text-white py-2 rounded font-medium">
                MUA NGAY
              </button>
              <button className="w-full bg-white text-primary border-primary border py-2 rounded font-medium">
                THÊM VÀO GIỎ
              </button>
            </div>
          </>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="md:w-3/5">
          <ProductDescription description={product.description} />
        </div>

        <div className="md:w-2/5 specifications-summary text-text border p-2 rounded-md">
          <SpecsTable />

          <Modal
            title="Thông số kỹ thuật đầy đủ"
            open={isModalVisible}
            onCancel={handleCancel}
            footer={[
              <button
                key="close"
                className="border border-gray-700 hover:border-primary hover:text-primary px-3 py-1 rounded-md"
                onClick={handleCancel}
              >
                Đóng
              </button>,
            ]}
          >
            <SpecsModal />
          </Modal>
        </div>
      </div>

      <div className="my-4 border p-4 rounded-md">
        <div className="text-primary font-bold text-2xl mb-2 text-center">
          CÂU HỎI THƯỜNG GẶP
        </div>
        <ProductQuestions />
      </div>

      <div>
        <SwiperWrapper items={relative} className="my-8" />
      </div>

      <div>
        <ProductReviews />
      </div>
    </div>
  );
};

export default ProductPage;
