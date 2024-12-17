import React, { useEffect, useState } from "react";
import { Select, Table, Card, message } from "antd";
import axios from "axios";
import { formatCurrency } from "../utils/currencyUtils";

const { Option } = Select;

const Revenue = () => {
  const [year, setYear] = useState(new Date().getFullYear()); // Mặc định năm hiện tại
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(false);

  // Tạo danh sách năm động
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2000 + 1 }, (_, i) => 2000 + i);

  // Fetch API khi năm thay đổi
  const fetchStatistics = async (selectedYear) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://techzone-2ow9.onrender.com/orders/statistic?year=${selectedYear}`
      );
      setStatistics(data);
    } catch (error) {
      message.error("Lỗi khi lấy dữ liệu thống kê");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatistics(year); // Fetch dữ liệu khi component mount
  }, [year]);

  // Cột dữ liệu cho bảng
  const columns = [
    {
      title: "Tháng",
      dataIndex: "month",
      key: "month",
      render: (text) => `Tháng ${text}`,
    },
    {
      title: "Doanh thu (VND)",
      dataIndex: "totalRevenue",
      key: "totalRevenue",
      render: (value) => value.toLocaleString(),
    },
    {
      title: "Số đơn hàng",
      dataIndex: "totalOrders",
      key: "totalOrders",
    },
    {
      title: "Đơn đang xử lý",
      dataIndex: ["statusCounts", "PROGRESS"],
      key: "PROGRESS",
    },
    {
      title: "Đơn đang giao",
      dataIndex: ["statusCounts", "DELIVERY"],
      key: "DELIVERY",
    },
    {
      title: "Đơn đã hoàn thành",
      dataIndex: ["statusCounts", "COMPLETED"],
      key: "COMPLETED",
    },
    {
      title: "Đơn đã hủy",
      dataIndex: ["statusCounts", "CANCELED"],
      key: "CANCELED",
    },
  ];

  return (
    <Card title="Thống kê doanh thu theo năm" bordered={false}>
      {/* Select lựa chọn năm */}
      <div className="mb-4 flex justify-end">
        <Select
          style={{ width: 150 }}
          value={year}
          onChange={(value) => setYear(value)}
          placeholder="Chọn năm"
        >
          {years.map((y) => (
            <Option key={y} value={y}>
              {y}
            </Option>
          ))}
        </Select>
      </div>

      {/* Hiển thị bảng dữ liệu */}
      {statistics ? (
        <>
          <h2 className="text-xl font-semibold mb-4">
            Tổng doanh thu: {statistics?.yearlyStats?.totalRevenue ?  formatCurrency(statistics.yearlyStats.totalRevenue) : null}
          </h2>
          <Table
            dataSource={statistics.monthlyStats}
            columns={columns}
            rowKey="month"
            loading={loading}
            pagination={false}
          />
        </>
      ) : (
        <p className="text-center">Không có dữ liệu thống kê cho năm {year}</p>
      )}
    </Card>
  );
};

export default Revenue;
