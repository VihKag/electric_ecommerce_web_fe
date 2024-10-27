import React from 'react';
import { Table, Tag, Space } from 'antd';

export default function AdminOrders() {
  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status) => (
        <Tag color={status === 'Completed' ? 'green' : 'volcano'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a>View Details</a>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      id: 'ORD-001',
      customer: 'John Brown',
      total: '$300.00',
      status: 'Completed',
    },
    {
      key: '2',
      id: 'ORD-002',
      customer: 'Jim Green',
      total: '$150.00',
      status: 'Pending',
    },
    // Add more order data as needed
  ];

  return (
    <div>
      <h1>Manage Orders</h1>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}