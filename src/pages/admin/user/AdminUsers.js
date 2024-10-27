import React from 'react';
import { Table, Button, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

export default function AdminUsers() {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} />
          <Button icon={<DeleteOutlined />} danger />
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      email: 'john@example.com',
      role: 'Admin',
    },
    {
      key: '2',
      name: 'Jim Green',
      email: 'jim@example.com',
      role: 'User',
    },
    // Add more user data as needed
  ];

  return (
    <div>
      <h1>Manage Users</h1>
      <Button type="primary" style={{ marginBottom: 16 }}>
        Add New User
      </Button>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}