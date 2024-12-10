import React, { useState, useEffect } from "react";
import { Table, Input, message, Tag, Space, Popover, Button } from "antd";
import { DeleteOutlined, EditOutlined, FileExcelOutlined, FilePdfOutlined, SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import { adminService } from "../../../services/apiService";
import { formatCurrency } from "../../../utils/currencyUtils";
const AdminUsers = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [sortField, setSortField] = useState("username");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchText, setSearchText] = useState("");

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await adminService.getOrders({
        params: {
          page: pagination.current,
          pageSize: pagination.pageSize,
          sortField,
          sortOrder,
          search: searchText,
        },
      });
      console.log(response.data);
      setOrders(response.data.data.orders);
      setTotal(response.data.data.totalOrders);
      setLoading(false);
    } catch (error) {
      message.error("Failed to fetch employees");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [pagination, sortField, sortOrder, searchText]);

  const handleTableChange = (pagination, filters, sorter) => {
    setPagination(pagination);
    if (sorter && "field" in sorter && "order" in sorter) {
      setSortField(sorter.field);
      setSortOrder(sorter.order === "descend" ? "desc" : "asc");
    }
  };
  const handleDelete = (id) => {

  };
  const handleEdit = (orders) => {
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      sorter: (a, b) => a._id - b._id,
    },
    {
      title: "User",
      dataIndex: ["infomationUser", "name"],
      key: "customerName",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Address",
      dataIndex: ["infomationUser", "address"],
      key: "address",
    },
    {
      title: "Phone",
      dataIndex: ["infomationUser", "phone"],
      key: "phone",
    },
    {
      title: "Products",
      dataIndex: "productItem",
      key: "productItem",
      render: (products) =>
        products.map((item) => (
          <div key={item._id}>
            <b>{item.name}</b> - {item.color} / {item.memory} (x{item.quantity})
          </div>
        )),
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (total) => `${formatCurrency(total)}`,
    },
    {
      title: "Trạng thái",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (status) => {
        let color = "";
        switch (status) {
          case "PROGRESS":
            color = "blue";
            break;
          case "COMPLETED":
            color = "green";
            break;
          case "CANCELED":
            color = "red";
            break;
          default:
            color = "default";
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record._id)}
          />
        </Space>
      ),
    },
  ];

  const exportToPDF = () => {};
  const exportToExcel = () => {};
  return (
    <div>
      <div className="flex justify-between items-center mb-6 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold">Order Management</h1>
        </div>
        <Space className="flex-wrap">
          <Popover content={<div>Pdf</div>}>
            <Button
              className="text-orange-600"
              onClick={exportToPDF}
              icon={<FilePdfOutlined />}
            />
          </Popover>
          <Popover content={<div>Excel</div>}>
            <Button
              className="text-green-600"
              onClick={exportToExcel}
              icon={<FileExcelOutlined />}
            />
          </Popover>
        </Space>
      </div>
      <div className="mb-4">
        <Input
          placeholder="Search by username"
          prefix={<SearchOutlined />}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 200 }}
        />
      </div>
      <Table
        columns={columns}
        dataSource={orders}
        rowKey="id"
        pagination={{
          ...pagination,
          total,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: ["5", "10", "20", "50"],
          showTotal: (total) => `Total ${total} items`,
        }}
        loading={loading}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default AdminUsers;
