import React, { useEffect, useState } from "react";
import { Avatar, Tabs, DatePicker, Tag, Button, Card, Modal } from "antd";
import { formatCurrency } from "../../../../utils/currencyUtils";
import { useSelector } from "react-redux";
import { commonService } from "../../../../services/apiService";
const { RangePicker } = DatePicker;

const orderStatuses = ["PROGRESS", "DELIVERY", "COMPLETED", "CANCELED"];

const orders = [
  {
    _id: "6747eaae128e28ae2682c98e",
    user: "6710f09aec59de47203e24a5",
    productItem: [
      {
        product: "6733b294b164eceb5bf5d82e",
        name: "Iphone 15 Pro Max 256G",
        quantity: 1,
        images:
          "https://res.cloudinary.com/dpczlxs5i/image/upload/v1731441300/kltn/agrb3ojgcqcjwogdpwgz.jpg",
        price: 29690000,
        memory: "256GB",
        color: "White",
        _id: "6747eaae128e28ae2682c98f",
      },
      {
        product: "6733b0cfb164eceb5bf5d824",
        name: "\u0110\u1ed3ng h\u1ed3 th\u00f4ng minh Apple Watch Series 8",
        quantity: 1,
        images:
          "https://res.cloudinary.com/dpczlxs5i/image/upload/v1731440848/kltn/rcgsonvjz0ospzrwkzs4.jpg",
        price: 5990000,
        memory: "40mm D\u00e2y Cao Su",
        color: "White",
        _id: "6747eaae128e28ae2682c990",
      },
    ],
    orderStatus: "PROGRESS",
    total: 35680000,
  },
];

export default function UserOrder() {
  const user = useSelector((state) => state.auth.user);
  const [activeTab, setActiveTab] = useState("PROGRESS");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [orders, setOrders] = useState([]);
  const fetchOrders = async () => {
    try {
      const response = await commonService.getOrderByUserId(user.id);
      console.log("data orders: ", response.data.order);
      setOrders(response.data.order);
    } catch (error) {
      console.log(error);
    }
  };
  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const showOrderDetails = (order) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-4">
          <RangePicker className="w-full" />
        </div>

        <Tabs
          activeKey={activeTab}
          onChange={handleTabChange}
          items={orderStatuses.map((status) => ({
            key: status,
            label: status,
            children: (
              <div className="space-y-4 overflow-y-scroll h-[780px]">
                {orders
                  .filter((order) => order.orderStatus === status)
                  .map((order) => (
                    <div
                      key={order._id}
                      className="border-b pb-4 flex flex-col space-y-4"
                    >
                      {order.productItem.map((item) => (
                        <div
                          key={item._id}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center">
                            <img
                              src={item.images}
                              alt={item.name}
                              className="w-20 h-20 object-cover rounded mr-4"
                            />
                            <div>
                              <h3 className="font-semibold">{item.name}</h3>
                              <p className="text-gray-600">
                                {item.memory} - {item.color}
                              </p>
                              <p className="text-red-500 font-bold">
                                {formatCurrency(item.price)}
                              </p>
                            </div>
                          </div>
                          <Tag
                            color={
                              status === "CANCELED"
                                ? "red"
                                : status === "COMPLETED"
                                ? "green"
                                : "blue"
                            }
                          >
                            {status}
                          </Tag>
                        </div>
                      ))}
                      <div className="text-right mt-4">
                        <Button
                          type="primary"
                          onClick={() => showOrderDetails(order)}
                        >
                          Xem chi tiết
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            ),
          }))}
        />
      </div>

      {/* Modal for Order Details */}
      {selectedOrder && (
        <Modal
          title="Chi tiết đơn hàng"
          open={isModalVisible}
          onCancel={handleModalClose}
          footer={null}
        >
          <div className="text-base">
            <h3 className="font-bold">Mã đơn hàng: {selectedOrder._id}</h3>
            <p className="font-medium">
              Tổng tiền:{" "}
              <span className="font-normal">
                {formatCurrency(selectedOrder.total)}
              </span>
            </p>
            <p className="font-medium">
              Người đặt hàng:{" "}
              <span className="font-normal">
                {selectedOrder.infomationUser.name}
              </span>
            </p>
            <p className="font-medium">
              Địa chỉ giao hàng:{" "}
              <span className="font-normal">
                {selectedOrder.infomationUser.address}
              </span>
            </p>
            <p className="font-medium">
              Số điện thoại:{" "}
              <span className="font-normal">
                {selectedOrder.infomationUser.phone}
              </span>
            </p>
            <div className="mt-4">
              <h4 className="font-semibold">Danh sách sản phẩm:</h4>
              {selectedOrder.productItem.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between border-b py-2"
                >
                  <div className="flex items-center">
                    <img
                      src={item.images}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded mr-4"
                    />
                    <div>
                      <h5 className="font-semibold">{item.name}</h5>
                      <p className="text-gray-600">
                        {item.memory} - {item.color} - Số lượng: {item.quantity}
                      </p>
                      <p className="text-red-500 font-bold">
                        {formatCurrency(item.price)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
