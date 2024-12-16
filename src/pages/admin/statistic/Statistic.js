import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Row, Col, Statistic, Table } from "antd";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { adminService } from "../../../services/apiService";

// Đảm bảo các phần của Chart.js được đăng ký
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Statistics = () => {
  const [statistics, setStatistics] = useState({
    topProducts: [],
    orderStatistics: [],
    topUsers: [],
  });

  const fetchStatistics = async () => {
    try {
      const response = await adminService.getStatisticOrders();
      setStatistics(response.data.data);
    } catch (error) {
      console.error("Error fetching statistics", error);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  // Cấu hình biểu đồ thống kê trạng thái đơn hàng
  const orderStatuses = statistics.orderStatistics.map(
    (status) => status.orderStatus
  );
  const orderCounts = statistics.orderStatistics.map((status) => status.count);
  const totalAmounts = statistics.orderStatistics.map(
    (status) => status.totalAmount
  );

  const orderChartData = {
    labels: orderStatuses,
    datasets: [
      {
        label: "Order Count",
        data: orderCounts,
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
      {
        label: "Total Amount",
        data: totalAmounts,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  // Cấu hình biểu đồ top sản phẩm bán chạy
  const productNames = statistics.topProducts.map((product) => product.name);
  const productQuantities = statistics.topProducts.map(
    (product) => product.quantity
  );

  const productChartData = {
    labels: productNames,
    datasets: [
      {
        label: "Quantity Sold",
        data: productQuantities,
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Thống kê tổng quát */}
      <Row gutter={16}>
        <Col span={8}>
          <Card className="shadow-lg rounded-lg">
            <Statistic
              title="Total Products Sold"
              value={statistics.topProducts.reduce(
                (sum, product) => sum + product.quantity,
                0
              )}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card className="shadow-lg rounded-lg">
            <Statistic
              title="Total Orders"
              value={statistics.orderStatistics.reduce(
                (sum, status) => sum + status.count,
                0
              )}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card className="shadow-lg rounded-lg">
            <Statistic
              title="Total Revenue"
              value={statistics.orderStatistics.reduce(
                (sum, status) => sum + status.totalAmount,
                0
              )}
              prefix="₫"
            />
          </Card>
        </Col>
      </Row>

      <div className="grid grid-cols-2 gap-2">
        {/* Biểu đồ trạng thái đơn hàng */}
        <Card
          title="Order Status Statistics"
          className="shadow-lg rounded-lg mt-8"
        >
          <Bar data={orderChartData} options={{ responsive: true }} />
        </Card>

        {/* Biểu đồ sản phẩm bán chạy */}
        <Card
          title="Top Selling Products"
          className="shadow-lg rounded-lg mt-8"
        >
          <Bar data={productChartData} options={{ responsive: true }} />
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-4">
  {/* Bảng top người dùng chi tiêu nhiều nhất */}
  <div className="col-span-2">
    <Card title="Top Users by Spending" className="shadow-lg rounded-lg mt-8">
      <Table
        dataSource={statistics.topUsers}
        columns={[
          { title: "User Email", dataIndex: "email", key: "email" },
          { title: "Username", dataIndex: "username", key: "username" },
          {
            title: "Total Spent",
            dataIndex: "totalSpent",
            key: "totalSpent",
            render: (text) => `₫${text.toLocaleString()}`,
          },
        ]}
        rowKey="userId"
        pagination={{ pageSize: 5 }}
      />
    </Card>
  </div>

  {/* Top sản phẩm */}
  <div className="col-span-1">
    <Card title="Top Products Sales" className="shadow-lg rounded-lg mt-8">
      <div className="space-y-4">
        {statistics.topProducts.map((product) => (
          <Card key={product.productId} className="flex items-center p-2 shadow-lg rounded-lg">
            <img
              src={product.images}
              alt={product.name}
              className="w-32 h-32 object-cover rounded-lg mr-6"
            />
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600">Quantity: {product.quantity}</p>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  </div>
</div>

    </div>
  );
};

export default Statistics;
