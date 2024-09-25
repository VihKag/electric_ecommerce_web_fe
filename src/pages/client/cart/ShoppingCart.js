import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Checkbox } from "antd";
import { useState } from "react";

const items = [
  {
    id: 1,
    discount: "1%",
    image:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-z-flip-6-xanh-duong-6_2.png",
    title: "Samsung Galaxy S24 Ultra 12GB 256GB",
    price: 27990000,
    oldPrice: "33.990.000",
    quantity: 4,
  },
  {
    id: 2,
    discount: "1%",
    image:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-z-flip-6-xanh-duong-6_2.png",
    title: "iPhone 15 Pro Max 256GB | Ch\u00EDnh h\u00E3ng VN/A",
    price: 29390000,
    oldPrice: "34.990.000",
    quantity: 1,
  },
  {
    id: 3,
    discount: "1%",
    image:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-z-flip-6-xanh-duong-6_2.png",
    title: "iPhone 13 128GB | Ch\u00EDnh h\u00E3ng VN/A",
    price: 13890000,
    oldPrice: "17.990.000",
    quantity: 2,
  },
];

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState(items);
  const [selectedItems, setSelectedItems] = useState([]);

  // handel fuction
  const toggleSelectedItems = (id) => {
    setSelectedItems(
      selectedItems.includes(id)
        ? selectedItems.filter((itemId) => itemId !== id)
        : [...selectedItems, id]
    );
  };
  const toggleSelectAll = () => {
    setSelectedItems(
      selectedItems.length === cartItems.length
        ? []
        : cartItems.map((item) => item.id)  
    );

  };

  const updateQuantity = (id, newQuantity) => {
    setCartItems(
      cartItems
        .map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container max-w-[780px] mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Giỏ hàng của bạn</h1>
      {cartItems.length === 0 ? (
        <p className="text-xl">Giỏ hàng trống.</p>
      ) : (
        <>
          <div>
          <Checkbox
                type="checkbox"
                checked={selectedItems.length === cartItems.length}
                onChange={toggleSelectAll}
              />
            <span> Chọn tất cả</span>
          </div>

          <div className="space-y-8">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-center border-b pb-4"
              >
                <Checkbox
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => toggleSelectedItems(item.id)}
                />
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-32 h-32 object-cover mb-4 md:mb-0 md:mr-4"
                />
                <div className="flex-grow">
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  <p className="text-gray-600">${item.price}</p>
                </div>
                <div className="flex items-center mt-4 md:mt-0">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <FontAwesomeIcon icon={faMinus} className="h-4 w-4" />
                  </Button>
                  <span className="mx-2 w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-4 text-red-500"
                    onClick={() => updateQuantity(item.id, 0)}
                  >
                    <FontAwesomeIcon icon={faTrash} className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col items-end">
            <p className="text-xl font-semibold mb-4">
              Tổng:{' '}
              {subtotal.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </p>
            <Button className="px-14 py-4 text-base font-semibold">Thanh toán</Button>
          </div>
        </>
      )}
    </div>
  );
}
