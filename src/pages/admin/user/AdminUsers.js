import React, { useState, useEffect } from 'react';
import { Table, Input, message, Switch, Space, Button, Modal } from 'antd';
import { DeleteOutlined, EditOutlined, EyeFilled, SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import { toast } from 'react-toastify';
import UpdateUserModal from '../../../components/modal/UpdateUserModal';
import { adminService } from '../../../services/apiService';
const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [sortField, setSortField] = useState('username');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const columns= [
    {
      title: 'ID',
      dataIndex: '_id',
      sorter: true,
      with: 280,
    },
    {
      title: 'Username',
      dataIndex: 'username',
      sorter: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: true,
    },
    {
      title: 'Bonuspoint',
      dataIndex: 'bonuspoint',
      sorter: true,
    },
    {
      title: 'Contact',
      dataIndex: 'contact',
      sorter: true,
    },
    {
      title: 'Image',
      dataIndex: 'images',
      render: (images) => images ? <img src={images} alt="Employee" style={{ width: 50, height: 50, objectFit: 'cover' }} /> : 'No Image',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      render: (date) => new Date(date).toLocaleDateString("vi-VN", {
        timeZone: "Asia/Ho_Chi_Minh",
      }),
      sorter: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Switch
          checked={status}
          onChange={(checked) => handleStatusChange(record._id, checked)}
          checkedChildren="Active"
          unCheckedChildren="Inactive"
          style={{
            backgroundColor: record.status ? "#22c55e" : "#ff4d4f",
          }}
        />
      ),
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      render: (date) => new Date(date).toLocaleDateString("vi-VN", {
        timeZone: "Asia/Ho_Chi_Minh",
      }),
      sorter: true,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EyeFilled />} />
          <Button icon={<EditOutlined />} type='primary' onClick={() => handleEdit(record)} />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record._id)}
          />
        </Space>
      ),
    }
  ];

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this user ?",
      onOk: async () => {
        try {
          const res = await adminService.deleteUsers(id);
          console.log(res);
          fetchUsers();
          message.success("Xóa thành công");
        } catch (error) {
          console.log(error);
          message.error("Xóa thất bại");
        }
      }
    });
  };


  const fetchUsers = async (
    page = pagination.current,
    pageSize = pagination.pageSize,
    sortField = 'username',
    sortOrder = 'asc',
    search = '',
  ) => {
    setLoading(true);
    try {
      const response = await adminService.getUsers({
        params: {
          page: pagination.current,
          pageSize: pagination.pageSize,
          sortField,
          sortOrder,
          search: searchText,
        },
      });
      console.log(response.data);
      setUsers(response.data.data.users);
      setTotal(response.data.total);
      setLoading(false);
    } catch (error) {
      message.error('Failed to fetch users', error);
      setLoading(false);
    }
  };


  const handleTableChange = (pagination, filters, sorter) => {
    setPagination(pagination);
    if (sorter && 'field' in sorter && 'order' in sorter) {
      setSortField(sorter.field);
      setSortOrder(sorter.order === 'descend' ? 'desc' : 'asc');
    }
  };

  const handleStatusChange = async (userId, newStatus) => {
    try {
      setLoading(true);
      const formdata = new FormData();
      formdata.append("status", newStatus);
      await adminService.updateUser(userId,formdata);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, status: newStatus } : user
        )
      );
    } catch (error) {
      message.error("Cập nhật thất bại!");
    } finally {
      setLoading(false);
    }
  };


  const handleSearch = async (search) => {
    setPagination({ current: 1 });
    fetchUsers(1, pagination.pageSize, sortField, sortOrder, search);
  }
  const handleModalSuccess = () => {
    setIsModalVisible(false);
    fetchUsers();
  };
  useEffect(() => {
    fetchUsers();
  }, [pagination.current, pagination.pageSize, sortField, sortOrder]);
  return (
    <div className="p-6 w-full">
            <div>
        <h1 className="text-2xl font-semibold mb-4">Danh sách người dùng</h1>
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
        dataSource={users}
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
        scroll={{ x: 1200 }}
        onChange={handleTableChange}
      />
      <UpdateUserModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onSuccess={handleModalSuccess}
        user={selectedUser}
      />
    </div>
  );
};

export default AdminUsers;

