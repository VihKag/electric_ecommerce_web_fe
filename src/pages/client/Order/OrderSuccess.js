import React, { useEffect, useState } from 'react';
import { Card, Descriptions, Typography, Result, Button } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { useSearchParams } from 'react-router-dom';

const { Title } = Typography;

const SuccessOrderPage = () => {
    const [searchParams] = useSearchParams(); // Destructure to get the search parameters
    const [orderDetails, setOrderDetails] = useState({});
  
    useEffect(() => {
      // Convert search params to an object
      const params = {};
      searchParams.forEach((value, key) => {
        params[key] = decodeURIComponent(value);
      });
      setOrderDetails(params);
    }, [searchParams]);

  return (
    <div className='p-6 max-w-[1200px] mx-auto'>
    <Card>
      <Result
        icon={<CheckCircleOutlined />}
        title="Payment Successful"
        subTitle="Your order has been processed successfully."
        extra={[
          <Button type="primary" key="back">
            Quay về trang chủ
          </Button>,
        ]}
      />
      <Title level={2}>Thông tin đơn hàng</Title>
      <Descriptions bordered>
        <Descriptions.Item label="Order ID">{orderDetails.vnp_TxnRef}</Descriptions.Item>
        <Descriptions.Item label="Amount">{orderDetails.vnp_Amount}</Descriptions.Item>
        <Descriptions.Item label="Payment Date">{orderDetails.vnp_PayDate}</Descriptions.Item>
        <Descriptions.Item label="Card Type">{orderDetails.vnp_CardType}</Descriptions.Item>
        <Descriptions.Item label="Bank Code">{orderDetails.vnp_BankCode}</Descriptions.Item>
        <Descriptions.Item label="Order Info">{orderDetails.vnp_OrderInfo}</Descriptions.Item>
      </Descriptions>
    </Card>
  </div>
  );
};

export default SuccessOrderPage;

