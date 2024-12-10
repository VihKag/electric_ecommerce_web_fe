import React, { useState, useEffect } from "react";
import { Table, Input, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { adminService } from "../../../services/apiService";
const AdminStaffs = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [sortField, setSortField] = useState("username");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchText, setSearchText] = useState("");

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await adminService.getStaffs({
        params: {
          page: pagination.current,
          pageSize: pagination.pageSize,
          sortField,
          sortOrder,
          search: searchText,
        },
      });
      console.log(response.data);
      setEmployees(response.data.data.staffs);
      setTotal(response.data.data.totalStaffs);
      setLoading(false);
    } catch (error) {
      message.error("Failed to fetch employees");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [pagination, sortField, sortOrder, searchText]);

  const handleTableChange = (pagination, filters, sorter) => {
    setPagination(pagination);
    if (sorter && "field" in sorter && "order" in sorter) {
      setSortField(sorter.field);
      setSortOrder(sorter.order === "descend" ? "desc" : "asc");
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      sorter: true,
    },
    {
      title: "Username",
      dataIndex: "username",
      sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Contact",
      dataIndex: "contact",
    },
    {
      title: "Image",
      dataIndex: "images",
      render: (images) =>
        images ? (
          <img
            src={images}
            alt="Employee"
            style={{ width: 50, height: 50, objectFit: "cover" }}
          />
        ) : (
          "No Image"
        ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (date) =>
        new Date(date).toLocaleDateString("vi-VN", {
          timeZone: "Asia/Ho_Chi_Minh",
        }),
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      render: (date) =>
        new Date(date).toLocaleDateString("vi-VN", {
          timeZone: "Asia/Ho_Chi_Minh",
        }),
    },
  ];

  return (
    <div className="p-6">
      <div>
        <h1 className="text-2xl font-semibold mb-4">Danh sách nhân viên</h1>
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
        dataSource={employees}
        rowKey="_id"
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

export default AdminStaffs;
