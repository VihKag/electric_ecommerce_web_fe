import React, { useState } from "react";
import { Avatar, Tabs, DatePicker, Tag, Button, Card } from "antd";
import { formatCurrency } from "../../../../utils/currencyUtils";
const { RangePicker } = DatePicker;
const orderStatuses = [
  "Hoàn thành",
  "Chờ xác nhận",
  "Đang vận chuyển",
  "Đã giao hàng",
  "Đã hủy",
];

const orders = [
  {
    id: 1,
    name: "TECNO SPARK Go 2024-Vàng",
    price: "1.950.000đ",
    status: "Hoàn thành",
    date: "29/09/2024 21:12",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "TECNO SPARK Go 2024-Vàng",
    price: "1.950.000đ",
    status: "Đã hủy",
    date: "29/09/2024 21:12",
    image: "/placeholder.svg?height=80&width=80",
  },
];
export default function UserOrder() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [activeTab, setActiveTab] = useState("Hoàn thành");

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const showOrderDetails = (order) => {
    setSelectedOrder(order)
    setIsModalVisible(true)
  }
  return (
    <>
      <Card className="mb-8">
        <div className="flex items-center">
          <div className="flex items-center">
            <Avatar size={64} src={user.image} />
            <div className="ml-4">
              <h2 className="text-xl font-bold text-purple-700">
                {user.username}
              </h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <Card>
          <h3 className="text-3xl font-bold">3</h3>
          <p className="text-gray-600">đơn hàng</p>
        </Card>
        <Card>
          <h3 className="text-3xl font-bold">450K</h3>
          <p className="text-gray-600">Tổng tiền tích lũy</p>
        </Card>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-4">
          <RangePicker
            className="w-full"
            placeholder={["01/12/2020", "30/09/2024"]}
          />
        </div>

        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={orderStatuses.map((status) => ({
            key: status,
            label: status,
            children: (
              <div className="space-y-4">
                {orders.map((order) =>
                  (order.status === status || status==="Tất cả") ? (
                    <div
                      key={order.id}
                      className="flex items-center justify-between border-b pb-4"
                    >
                      <div className="flex items-center">
                        <img
                          src={order.image}
                          alt={order.name}
                          className="w-20 h-20 object-cover rounded mr-4"
                        />
                        <div>
                          <h3 className="font-semibold">{order.name}</h3>
                          <p className="text-red-500 font-bold">
                            {formatCurrency(order.price)}
                          </p>
                          <Tag
                            color={order.status === "Đã hủy" ? "red" : "green"}
                          >
                            {order.status}
                          </Tag>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-gray-500 text-sm mb-2">
                          {order.date}
                        </div>
                        <Button
                          type="primary"
                          danger={order.status === "Đã hủy"}
                        >
                          Xem chi tiết
                        </Button>
                      </div>
                    </div>
                  ) : null
                )}
              </div>
            ),
          }))}
        />
      </div>
    </>
  );
}
