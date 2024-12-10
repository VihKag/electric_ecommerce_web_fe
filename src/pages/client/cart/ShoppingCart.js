import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartService } from "../../../services/apiService";
import { formatCurrency } from "../../../utils/currencyUtils";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateCart } from "../../../redux/slices/cartSlice";
import { nanoid } from "nanoid";

export default function ShoppingCart() {
  const navigate = useNavigate();
  const [price, setPrice] = useState(0);
  const user = useSelector((state) => state.auth.user);
  useEffect(() =>{
    if (!user) {
      navigate('/auth/login');
      toast.info('Vui lòng đăng nhập!')
    }
  },[])
  const cartData = useSelector((state) => state.cart);
  const [selectedItems, setSelectedItems] = useState([]);
  const dispatch = useDispatch();

  const calculateTotal = () => {
    const selectedProducts = cartData.productItem.filter((item) =>
      selectedItems.includes(item._id) // Kiểm tra sản phẩm có được chọn không
    );
  
    return selectedProducts.reduce((total, item) => {
      return total + item.price * item.quantity; // Cộng dồn giá trị của từng sản phẩm
    }, 0);
  };

  const toggleSelectedItems = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  const toggleSelectAll = () => {
    if (selectedItems.length === cartData.productItem.length) {
      setSelectedItems([]); // Deselect all items
    } else {
      setSelectedItems(cartData.productItem.map((item) => item._id)); // Select all items
    }
  };
  
  useEffect(() => {
    console.log(selectedItems);
      // Tổng tiền sẽ được tính theo logic trong `calculateTotal`
    const totalPrice = calculateTotal();
    setPrice(totalPrice);
  }, [selectedItems, cartData.productItem]);


  const handleQuantityChange = (id, quantity_change) => {
    
    const item = cartData.productItem.find((product) => product._id === id);
    if (!item) {
      toast.warn(`${item}`)
      return;
    };
    console.log("item: ",item);
    if (!item) {
      toast.warn('Vui lòng chọn sản phẩm thanh toán!')
      return;
    };
    const payload = {
      user: user?.id,
      product: item.product,
      quantity: quantity_change,
      memory: item.memory || null,
      color: item.color || null,
    };
    console.log(payload);
    dispatch(updateCart(payload))
      .unwrap()
      .then((updatedCart) => {
        console.log('Cập nhật giỏ hàng thành công:', updatedCart);
      })
      .catch((error) => {
        console.error('Lỗi cập nhật giỏ hàng:', error);
      });
    console.log(`Change quantity of ${id} to ${quantity_change}`);
  };
  
  const handleBuyNow = () => {
    // Kiểm tra nếu có sản phẩm trong giỏ hàng đã được chọn
    if (selectedItems.length > 0) {
      // Lọc ra các sản phẩm từ cartData mà được chọn
      const orderItems = cartData.productItem.filter((item) =>
        selectedItems.includes(item._id) // Kiểm tra sản phẩm có trong danh sách đã chọn không
      ).map((item) => {
        const selectedVariant = item.variant; // Lấy variant của sản phẩm (nếu có)
        
        return {
          product: item.product,
          name: item.name,
          quantity: item.quantity, // Số lượng của sản phẩm trong giỏ
          images: item.images, // Hình ảnh sản phẩm
          price: item.price ?? 0, // Giá của sản phẩm
          color: item.color ?? "Màu mặc định", // Màu của sản phẩm
          memory: item.memory ?? "Dung lượng mặc định", // Bộ nhớ của sản phẩm
        };
      });
      console.log(orderItems);
      const randomKey = nanoid(6);
      // Lưu giỏ hàng vào sessionStorage với key là mã ngẫu nhiên
      sessionStorage.setItem(randomKey, JSON.stringify(orderItems));    
      // Chuyển hướng đến trang thanh toán với mã giỏ hàng
      navigate(`/checkout?ckt=${randomKey}`);
    } else {
      // Thông báo nếu không có sản phẩm nào được chọn
      toast.info("Vui lòng chọn sản phẩm trước khi mua!");
    }
  };


  const handleRemoveItem = (id, quantity_change) => {
    handleQuantityChange(id, quantity_change)
    console.log(`Remove item with ID: ${id}`);
  };
  
  return (
    <div className="container max-w-3xl mx-auto mt-8 px-4 max-h-screen">
      <h1 className="text-3xl font-bold mb-8">Giỏ hàng của bạn</h1>
      {cartData.productItem.length === 0 ? (
        <p className="text-xl">Giỏ hàng trống.</p>
      ) : (
        <div>
          <div className="my-6 border-b pb-4">
          <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked={selectedItems.length === cartData.productItem.length}
                  onChange={toggleSelectAll}
                  className="w-5 h-5"
                />
                <span className="text-sm">Chọn tất cả</span>
              </div>
          </div>
          <div className="space-y-4">
            {console.log(cartData.productItem)}
            {cartData?.productItem.map((item,index) => (
              <div
                key={item._id || `fallback-${index}`}
                className="flex items-center space-x-4 border-b pb-4"
              >
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item._id)}
                  onChange={() => toggleSelectedItems(item._id)}
                  className="w-5 h-5"
                />
                <img
                  src={item.images}
                  alt={item.name}
                  className="w-24 h-24 object-cover"
                />
                <div className="flex-grow">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-600">Memory: {item.memory}</p>
                  <p className="text-sm text-gray-600">Color: {item.color}</p>
                  <p className="text-sm font-medium">
                    {formatCurrency(item.price)}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleQuantityChange(item?._id, -1)}
                    className="w-8 h-8 flex items-center justify-center border rounded-full"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{item?.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item?._id, 1)}
                    className="w-8 h-8 flex items-center justify-center border rounded-full"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => handleRemoveItem(item?._id, -item?.quantity)}
                  className="text-red-500 hover:text-red-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <div className="fixed bottom-0 left-0 right-0">
            <div className="max-w-3xl mx-auto flex items-center justify-between border rounded-t-md shadow-md py-2 px-4">
              <p className="text-lg font-semibold">
                Tạm tính: {formatCurrency(price)}
              </p>

              <button 
              onClick={handleBuyNow}
              className="mt-2 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200">
                Thanh toán
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
