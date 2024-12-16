import React, { useState } from "react";
import { Table, Input, Pagination, Spin, Space, Button, Modal, message } from "antd";
import axios from "axios";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { adminService } from "../../../services/apiService";
import { toast } from "react-toastify";
const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [searchInput, setSearchInput] = useState(""); // Separate state for input
  // Fetch reviews from API
  const fetchReviews = async (page, pageSize, search) => {
    setLoading(true);
    try {
      const { data } = await adminService.getReviews({
        params: {
          page,
          pageSize,
          search,
        },
      });
      if (data.success) {
        setReviews(data.data.reviews);
        setTotal(data.data.totalReviews);
      }
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    }
    setLoading(false);
  };

  // Handle pagination change
  const handlePaginationChange = (page, pageSize) => {
    setPage(page);
    setPageSize(pageSize);
    fetchReviews(page, pageSize, search);
  };

  // Columns for Ant Design Table
  const columns = [
    {
      title: "User",
      dataIndex: ["owner", "username"],
      key: "owner",
    },
    {
      title: "Email",
      dataIndex: ["owner", "email"],
      key: "email",
    },
    {
      title: "Product",
      dataIndex: ["parentProduct", "name"],
      key: "parentProduct",
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => <span>{`${rating}/5`}</span>,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record._id)}
          />
        </Space>
      ),
    },
  ];
  const handleDelete = (id) => {
    Modal.confirm({
      title: "Bạn có chắc muốn xóa danh mục này?",
      onOk: async () => {
        try {
          adminService.deleteReview(id);
          message.success("Xóa thành công");
          setReviews((prevCategories) =>
            prevCategories.filter((category) => category._id !== id)
          );
        } catch (error) {
          console.log(error);
          message.error("Xóa thất bại");
        }
      },
    });
  };
  // Handle search input change
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  // Handle search action
  const handleSearch = () => {
    setSearch(searchInput);
    setPage(1); // Reset to the first page when searching
    fetchReviews(1, pageSize, searchInput);
  };
  // Fetch reviews when component mounts or dependency changes
  React.useEffect(() => {
    fetchReviews(page, pageSize, search);
  }, [page, pageSize, search]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Quản lí đánh giá</h1>
      </div>
      <div className="mb-4">
        <Input
          placeholder="Search reviews"
          value={searchInput}
          onChange={handleSearchInputChange}
          className="w-60"
          onPressEnter={handleSearch} // Allow search on Enter key
        />
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          dataSource={reviews}
          columns={columns}
          rowKey="_id"
          pagination={false}
        />
      )}

      <div className="flex justify-end mt-4">
        <Pagination
          current={page}
          pageSize={pageSize}
          total={total}
          showSizeChanger
          onChange={handlePaginationChange}
        />
      </div>
    </div>
  );
};

export default AdminReviews;
