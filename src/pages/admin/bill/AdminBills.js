import React from 'react';
import { Table, Tag, Space } from 'antd';

export default function AdminBills() {
  const columns = [
    {
      title: 'Bill ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Order ID',
      dataIndex: 'orderId',
      key: 'orderId',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status) => (
        <Tag color={status === 'Paid' ? 'green' : 'volcano'}>
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
      id: 'BILL-001',
      orderId: 'ORD-001',
      amount: '$300.00',
      status: 'Paid',
    },
    {
      key: '2',
      id: 'BILL-002',
      orderId: 'ORD-002',
      amount: '$150.00',
      status: 'Unpaid',
    },
    // Add more bill data as needed
  ];

  return (
    <div>
      <h1>Manage Bills</h1>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}