import React, { useEffect, useState } from "react";
import { Breadcrumb, Card, Table, Tag } from "antd";
import { adminService } from "../../../services/apiService";
import { EditOutlined, HomeOutlined, StarFilled } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { formatCurrency } from "../../../utils/currencyUtils";
const AdminOrderDetails = () => {
    const {orderId} = useParams();
    const [order, setOrder] = useState({});

  const fetchOrderDetail = async () => {
    try {
      const response = await adminService.getOrdersById(orderId);
      console.log("order detail: ", response.data.order);
      setOrder(response.data.order);
    } catch (error) {
      console.log(error);
    }
  };


  // Cột cho bảng sản phẩm
  const productColumns = [
    {
      title: "Image",
      dataIndex: "images",
      key: "images",
      render: (text) => (
        <img
          src={text}
          alt="Product"
          className="w-20 h-20 object-cover rounded"
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Memory",
      dataIndex: "memory",
      key: "memory",
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => `${text.toLocaleString()} VND`,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Total",
      key: "total",
      render: (_, record) =>
        `${(record.price * record.quantity).toLocaleString()} VND`,
    },
  ];

  useEffect(() => {
    fetchOrderDetail()
  },[])
  return (
    <>
      <Breadcrumb
        className="text-base font-medium m-1"
        separator=">"
        items={[
          {
            href: "/admin",
            title: <HomeOutlined />,
          },
          {
            href: `/admin/orders`,
            title: (
              <>
                <span>orders</span>
              </>
            ),
          },
          {
            title: order?._id,
          },
        ]}
      />

      <div className="bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Order Details</h1>

        {/* Thông tin người dùng */}
        <Card className="mb-6 shadow-md">
          <h2 className="text-lg font-semibold mb-2">Customer Information</h2>
          <p>
            <strong>Name:</strong> {order.infomationUser?.name}
          </p>
          <p>
            <strong>Address:</strong> {order.infomationUser?.address}
          </p>
          <p>
            <strong>Phone:</strong> {order.infomationUser?.phone}
          </p>
          <p>
            <strong>Paid:</strong>{" "}
            {order.paid ? (
              <Tag color="green">Paid</Tag>
            ) : (
              <Tag color="red">Unpaid</Tag>
            )}
          </p>
          <p>
            <strong>Order Status:</strong>{" "}
            <Tag color={order.orderStatus === "COMPLETED" ? "blue" : "orange"}>
              {order.orderStatus}
            </Tag>
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(order.createdAt).toLocaleString()}
          </p>
        </Card>

        {/* Bảng sản phẩm */}
        <Card className="shadow-md">
          <h2 className="text-lg font-semibold mb-4">Products</h2>
          <Table
            scroll={1200}
            columns={productColumns}
            dataSource={order.productItem}
            rowKey="_id"
            pagination={false}
          />
          <div className="text-right mt-4">
            <h3 className="text-xl font-bold">
              Total: {formatCurrency(order.total)}
            </h3>
          </div>
        </Card>
      </div>
    </>
  );
};

export default AdminOrderDetails;
