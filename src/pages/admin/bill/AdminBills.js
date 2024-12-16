import React, { useState, useEffect } from 'react';
import { Table, Input, Select, Button, Modal, Tag, Spin, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import { formatCurrency } from '../../../utils/currencyUtils';
import { adminService } from '../../../services/apiService';

const { Option } = Select;

const AdminBills = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalBills, setTotalBills] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState({
    billCode: null,
    paymentMethod: null,
    minTotal: null,
    maxTotal: null,
  });
  const [selectedBill, setSelectedBill] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchBills();
  }, [currentPage, pageSize, filters]);

  const fetchBills = async () => {
    setLoading(true);
    try {
      const response = await adminService.getAllBils({
        params: {
          ...filters,
          page: currentPage,
          limit: pageSize,
        },
      });
      setBills(response.data.data.bills);
      setTotalBills(response.data.data.totalBills);
    } catch (error) {
      message.error('Failed to fetch bills');
    }
    setLoading(false);
  };

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
    setCurrentPage(1);
  };

  const columns = [
    {
      title: 'Bill Code',
      dataIndex: 'billCode',
      key: 'billCode',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (total) => `${formatCurrency(total)}`,
    },
    {
      title: 'Payment Method',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
    },
    {
      title: 'Order Status',
      dataIndex: ['order', 'orderStatus'],
      key: 'orderStatus',
      render: (status) => (
        <Tag color={status === 'PROGRESS' ? 'blue' : 'green'}>{status}</Tag>
      ),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleString('vi-VN'),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button onClick={() => showBillDetails(record)}>View Details</Button>
      ),
    },
  ];

  const showBillDetails = (bill) => {
    setSelectedBill(bill);
    setIsModalVisible(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Bill Management</h1>
      <div className="mb-4 flex flex-wrap gap-4">
        <Input
          placeholder="Search by Bill Code"
          prefix={<SearchOutlined />}
          onChange={(e) => handleFilterChange('billCode', e.target.value)}
          className="w-64"
        />
        <Select
          placeholder="Payment Method"
          onChange={(value) => handleFilterChange('paymentMethod', value)}
          className="w-48"
        >
          <Option value="">All</Option>
          <Option value="VNPAY">VNPAY</Option>
          <Option value="COD">COD</Option>
        </Select>
        <Input
          placeholder="Min Total"
          type="number"
          onChange={(e) => handleFilterChange('minTotal', e.target.value)}
          className="w-32"
        />
        <Input
          placeholder="Max Total"
          type="number"
          onChange={(e) => handleFilterChange('maxTotal', e.target.value)}
          className="w-32"
        />
      </div>
      <Table
        columns={columns}
        dataSource={bills}
        rowKey="_id"
        loading={loading}
        pagination={{
          total: totalBills,
          current: currentPage,
          pageSize: pageSize,
          onChange: (page, pageSize) => {
            setCurrentPage(page);
            setPageSize(pageSize);
          },
          showSizeChanger: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        }}
      />
      <Modal
        title=""
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
      >
        {selectedBill && (
          <div>
            <h3 className="font-bold mt-4">Thông tin hóa đơn</h3>
            <p><strong>Bill Code:</strong> {selectedBill.billCode}</p>
            <p><strong>Total:</strong> {selectedBill.total.toLocaleString('vi-VN')} VND</p>
            <p><strong>Payment Method:</strong> {selectedBill.paymentMethod}</p>
            <p><strong>Order Status:</strong> {selectedBill.order.orderStatus}</p>
            <p><strong>Created At:</strong> {new Date(selectedBill.createdAt).toLocaleString('vi-VN')}</p>
            <h3 className="font-bold mt-4">Thông tin khách hàng</h3>
            <p><strong>Name:</strong> {selectedBill.order.infomationUser.name}</p>
            <p><strong>Phone:</strong> {selectedBill.order.infomationUser.phone}</p>
            <p><strong>Address:</strong> {selectedBill.order.infomationUser.address}</p>
            <h3 className="font-bold mt-4">Các sản phẩm</h3>
            <ul>
              {selectedBill.order.productItem.map((item, index) => (
                <li key={index} className="mb-2 flex space-y-2 items-center gap-4">
                  <img src={item.images} alt={item.name} className="size-24 object-cover" />
                  <div>
                    <p><strong>Name:</strong> {item.name}</p>
                    <p><strong>Quantity:</strong> {item.quantity}</p>
                    <p><strong>type:</strong>{item.memory} </p>
                    <p><strong>Color:</strong> {item.color}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminBills;

