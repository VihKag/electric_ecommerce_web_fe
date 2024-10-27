import React from 'react';
import { Table, Button, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

export default function AdminProducts() {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
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
      name: 'Product 1',
      price: '$19.99',
      stock: 100,
    },
    {
      key: '2',
      name: 'Product 2',
      price: '$29.99',
      stock: 50,
    },
    // Add more product data as needed
  ];

  return (
    <div>
      <h1>Manage Products</h1>
      <Button type="primary" style={{ marginBottom: 16 }}>
        Add New Product
      </Button>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}