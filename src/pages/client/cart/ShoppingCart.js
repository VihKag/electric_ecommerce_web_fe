import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Checkbox } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  // handel fuction
  const toggleSelectedItems = (props) => {
    setSelectedItems(
      selectedItems.includes(props)
        ? selectedItems.filter((item) => item !== props)
        : [...selectedItems, props]
    );
  };
  const toggleSelectAll = () => {
    setSelectedItems(
      selectedItems.length === cartItems.length
        ? []
        : cartItems.map((item) => item)
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
    setSelectedItems(
      selectedItems
        .map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const subtotal = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleProceedToPayment = () => {
    const itemsForPayment = cartItems.filter((item) =>
      selectedItems.includes(item)
    );
    navigate("/payment", { state: { itemsForPayment, subtotal } });
  };

  useEffect(() => {
    console.log(selectedItems);
  }, [selectedItems]);

  return (
    <>
      <div className="container w-full max-w-[780px] mx-auto mt-8">
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

            <div className="space-y-8 mt-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row items-center border p-4 rounded-lg bg-white"
                >
                  <Checkbox
                    type="checkbox"
                    checked={selectedItems
                      .map((item) => item.id)
                      .includes(item.id)}
                    onChange={() => toggleSelectedItems(item)}
                  />
                  <img
                    src={item.image}
                    alt={item.title}
                    className="size-28 object-cover mb-4 md:mb-0 md:mr-4"
                  />
                  <div className="flex-grow">
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="text-gray-600">${item.price}</p>
                  </div>
                  <div className="flex items-center mt-4 md:mt-0">
                    <Button
                      variant="outline"
                      size="small"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <FontAwesomeIcon icon={faMinus} className="h-4 w-4" />
                    </Button>
                    <span className="mx-2 w-8 text-center">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="small"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="small"
                      className="ml-4 text-red-500"
                      onClick={() => updateQuantity(item.id, 0)}
                    >
                      <FontAwesomeIcon icon={faTrash} className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <div className="fixed bottom-0 w-full max-w-[780px] left-1/2 -translate-x-1/2 border rounded-lg flex items-center justify-between bg-white px-3 pb-4 pt-3">
        <p className="text-xl font-semibold">
          Tổng:{" "}
          {subtotal.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </p>
        <Button
          className="px-10 py-5 text-base font-semibold text-primary"
          onClick={handleProceedToPayment}
          disabled={subtotal === 0}
        >
          Thanh toán
        </Button>
      </div>
    </>
  );
}
