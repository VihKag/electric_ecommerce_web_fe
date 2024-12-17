import React, { useCallback, useEffect, useState } from "react";
import "swiper/css";
import ThumbsGallery from "../../../components/thumbs/Thumbs";
import ProductReviews from "../../../components/product/ProductPreviews";
import ProductQuestions from "../../../components/product/ProductQuestions";
import ProductDescription from "../../../components/product/ProductDescription";
import { Breadcrumb, message, Modal } from "antd";
import { categoryService, productService } from "../../../services/apiService";
import { useNavigate, useParams } from "react-router-dom";
import { formatCurrency } from "../../../utils/currencyUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import SwiperWrapper from "../../../components/swiper/Swiper";
import { toast } from "react-toastify";
import { HomeOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { addToCheckout, updateCart } from "../../../redux/slices/cartSlice";
import { nanoid } from "nanoid"; // Import nanoid
const ProductPage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
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
  const [category, setCategory] = useState({});
  const dispatch = useDispatch();

  // Xử lý hành động khi nhấn nút "MUA NGAY"
  const handleBuyNow = () => {
    if (selectedVariant) {
      const orderItem = {
        product: product._id,
        name: product.name,
        quantity: 1,
        images: product.images[0],
        price:
          selectedVariant?.variant?.price?.discount ??
          selectedVariant?.variant?.price?.initial ??
          0, // Giá mặc định là 0 nếu cả hai đều không tồn tại
        color: selectedVariant.color,
        memory: selectedVariant.memory,
      };
      // Tạo mã ngẫu nhiên 6 ký tự sử dụng nanoid
      const randomKey = nanoid(6);

      // Lưu vào sessionStorage với key là mã ngẫu nhiên
      sessionStorage.setItem(randomKey, JSON.stringify([orderItem]));
      if (!user) {
        message.info("Vui lòng đăng nhập để mua hàng!");
        navigate("/auth/login");
        return;
      }
      navigate(`/checkout?ckt=${randomKey}`);
    } else {
      message.infor("Vui lòng chọn một loại sản phẩm trước khi mua!");
    }
  };

  const handleUpdateCart = () => {
    const payload = {
      user: user?.id,
      product: product._id,
      quantity: quantity,
      memory: selectedVariant.memory,
      color: selectedVariant.color,
    };

    dispatch(updateCart(payload))
      .unwrap()
      .then((updatedCart) => {
        console.log("Cập nhật giỏ hàng thành công:", updatedCart);
        message.success("Cập nhật giỏ hàng thành công!");
      })
      .catch((error) => {
        console.error("Lỗi cập nhật giỏ hàng:", error);
      });
  };

  // Hàm để mở modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Hàm để đóng modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  useEffect(() => {
    console.log(selectedVariant);
  }, [selectedColor, selectedMemory]);
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
        const categoryRes = await categoryService.getCategoryById(
          response.data.data.product.category
        );
        setCategory(categoryRes.data.data);
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
      {/* {console.log("select: ", selectedVariant?.variant)} */}
      <div className="my-2">
        <Breadcrumb
          className="text-base text-gray font-medium"
          items={[
            {
              href: "/",
              title: <HomeOutlined />,
            },
            {
              href: `/category/${product.category}`,
              title: (
                <>
                  <span>{category.name}</span>
                </>
              ),
            },
            {
              title: product.name,
            },
          ]}
        />
      </div>
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
                  {product.brand?.name ? product.brand.name : null}
                </div>
              </div>
              <span className="mx-2 select-none">|</span>
              {/* Đánh giá rating */}
              <div className="flex items-center">
                <div className="font-semibold">Đánh giá:</div>
                <div className="ml-2 flex items-center">
                  <h4 className="mr-1">{product.rating?.toFixed(1)}</h4>
                  <span>
                    <FontAwesomeIcon icon={faStar} color="yellow" />
                  </span>
                </div>
              </div>
            </div>

            {/* variants sản phẩm */}
            <div className="mb-2">
              {/* Chọn loại variants */}
              <div className="mb-2">
                <div className="flex gap-2">
                  {variants?.length > 0
                    ? variants.map(
                        (variant, index) =>
                          variant.memory !=="null" ? ( // Kiểm tra nếu variant.memory tồn tại
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
                          ) : null // Nếu không có variant.memory thì trả về null
                      )
                    : null}{" "}
                  {/* Nếu không có variants thì trả về null */}
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
                        className={`px-2 min-w-fit py-1 border rounded flex flex-col ${
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
                        <div>
                          {formatCurrency(
                            v.price.discount
                              ? v.price.discount
                              : v.price.initial
                          )}
                        </div>
                      </button>
                    ))}
                </div>
              </div>
            </div>

            {selectedVariant ? (
              <div className="rounded mb-4 flex items-baseline gap-2">
                <div className="text-sale font-semibold text-lg">
                  {formatCurrency(
                    selectedVariant.variant?.price?.discount
                      ? selectedVariant.variant.price.discount
                      : selectedVariant.variant?.price?.initial
                  )}
                </div>
                {selectedVariant.variant?.price?.discount && (
                  <span className="text-discount line-through font-semibold">
                    {formatCurrency(selectedVariant.variant.price.initial)}
                  </span>
                )}
              </div>
            ) : null}

            <div className="flex gap-2">
              <button
                onClick={handleBuyNow}
                className="w-full bg-primary text-white py-2 rounded font-medium"
              >
                MUA NGAY
              </button>
              <button
                onClick={() => handleUpdateCart()}
                className="w-full bg-white text-primary border-primary border py-2 rounded font-medium"
              >
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
        <div className="text-primary font-bold text-xl text-center">
          CÂU HỎI THƯỜNG GẶP
        </div>
        <ProductQuestions />
      </div>

      <div className="p-2 rounded-md border my-2">
        <div className="font-bold text-xl m-2 text-left">
          Sản phẩm liên quan
        </div>
        <SwiperWrapper items={relative} className="my-8" />
      </div>

      <div>
        <ProductReviews productId={productId} />
      </div>
    </div>
  );
};

export default ProductPage;
