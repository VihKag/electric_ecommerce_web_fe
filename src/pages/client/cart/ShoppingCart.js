import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { cardService } from "../../../services/apiService";
import { formatCurrency } from "../../../utils/currencyUtils";

export default function ShoppingCart() {
  const user = useSelector((state) => state.auth.user);
  const cartData = useSelector((state) => state.cart);
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleSelectedItems = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    setSelectedItems(cartData.productItem.map((item) => item._id)
    );
  };

  useEffect(() => {
    console.log(selectedItems);
    
  }, [selectedItems]);


  const handleQuantityChange = (id, change) => {
    // Implement quantity change logic here
  };

  const handleRemoveItem = (id) => {
    // Implement remove item logic here
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
            {cartData.productItem.map((item) => (
              <div
                key={item._id}
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
                    onClick={() => handleQuantityChange(item._id, -1)}
                    className="w-8 h-8 flex items-center justify-center border rounded-full"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item._id, 1)}
                    className="w-8 h-8 flex items-center justify-center border rounded-full"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => handleRemoveItem(item._id)}
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
                Tạm tính: {formatCurrency(cartData.total)}
              </p>

              <button className="mt-2 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200">
                Thanh toán
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
