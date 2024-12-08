import React, { useEffect, useState } from 'react';
import { Card, Descriptions, Typography, Alert } from 'antd';
import { useSearchParams } from 'react-router-dom';

const { Title } = Typography;

const FailedOrderPage = () => {
  const [searchParams] = useSearchParams(); // Destructuring to access searchParams
  const [orderDetails, setOrderDetails] = useState({});

  useEffect(() => {
    // Convert searchParams to an object
    const params = {};
    searchParams.forEach((value, key) => {
      params[key] = decodeURIComponent(value); // Decoding each param value
    });
    setOrderDetails(params);
  }, [searchParams]);

  return (
    <div className='p-6 max-w-[1200px] mx-auto'>
      <Alert
        message="Giao dịch thất bại"
        description="Đơn hàng của bạn không thể hoàn tất. Vui lòng kiểm tra lại thông tin dưới đây."
        type="error"
        showIcon
        style={{ marginBottom: '24px' }}
      />
      <Card>
        <Title level={3}>Chi tiết đơn hàng</Title>
        <Descriptions bordered column={1}>
          {/* Dynamically render order details */}
          {Object.entries(orderDetails).map(([key, value]) => (
            <Descriptions.Item key={key} label={key}>
              {value}
            </Descriptions.Item>
          ))}
        </Descriptions>
      </Card>
    </div>
  );
};

export default FailedOrderPage;
