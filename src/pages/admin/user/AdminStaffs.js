import React, { useState, useEffect } from "react";
import { Table, Input, message, Space, Button, Modal } from "antd";
import {
  EditOutlined,
  EyeFilled,
  SearchOutlined,
  DeleteOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { adminService } from "../../../services/apiService";
import UpdateStaffModal from "../../../components/modal/UpdateStaffModal";
import AddStaffModal from "../../../components/modal/AddStaffModal";
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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
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
      render: (role) => role=== "employee" ? ("staff") : role,
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
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EyeFilled />} onClick={()=> handleView(record)} />
          <Button
            icon={<EditOutlined />}
            type="primary"
            onClick={() => handleEdit(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record._id)}
          />
        </Space>
      ),
    },
  ];
  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };
  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this staff ?",
      onOk: async () => {
        try {
          const res = await adminService.deleteEmployees(id);

          fetchEmployees();
          message.success(res.data.message);
        } catch (error) {
          console.log(error);
          message.error("Xóa thất bại");
        }
      },
    });
  };
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
  const handleModalSuccess = () => {
    setIsModalVisible(false);
    fetchEmployees();
  };
  const handleSearch = async (search) => {
    setPagination({ current: 1 });
    fetchEmployees(1, pagination.pageSize, sortField, sortOrder, search);
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setPagination(pagination);
    if (sorter && "field" in sorter && "order" in sorter) {
      setSortField(sorter.field);
      setSortOrder(sorter.order === "descend" ? "desc" : "asc");
    }
  };

  const handleView = (staff) => {
    Modal.info({
      title: 'Thông tin nhân viên',
      content: (
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            {staff.images ? (
              <img
                src={staff.images}
                alt={staff.username}
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                <span className="text-2xl text-gray-400">{staff.username[0].toUpperCase()}</span>
              </div>
            )}
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{staff.username}</h3>
              <p className="text-sm text-gray-500">{staff.role}</p>
            </div>
          </div>
          <div className="grid gap-4 text-sm">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-500 mb-1">Email Address</p>
              <p className="font-medium">{staff.email}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-500 mb-1">Contact Information</p>
              <p className="font-medium">{staff.contact || 'Not provided'}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-500 mb-1">Account Created</p>
              <p className="font-medium">{new Date(staff.createdAt).toLocaleDateString('vi-VN')}</p>
            </div>
          </div>
        </div>
      ),
      width: 480,
      className: 'staff-details-modal',
      icon: null,
    })
  }

  useEffect(() => {
    fetchEmployees();
  }, [pagination]);
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold mb-4">Danh sách nhân viên</h1>
        <div>
        <Button 
            type="primary"
            icon={<UserAddOutlined />}
            onClick={() => setIsAddModalVisible(true)}
          >
            Add Staff
          </Button>
        </div>
      </div>
      <div className="mb-4">
        <Input
          placeholder="Search by username"
          prefix={<SearchOutlined />}
          onChange={(e) => setSearchText(e.target.value)}
          onPressEnter={(e) => handleSearch(e.target.value)}
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
        scroll={{ x: 1200 }}
        onChange={handleTableChange}
      />
      <UpdateStaffModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onSuccess={handleModalSuccess}
        user={selectedUser}
      />
      <AddStaffModal
        visible={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        onSuccess={() => {
          setIsAddModalVisible(false)
          fetchEmployees()
        }}
      />
    </div>
  );
};

export default AdminStaffs;
