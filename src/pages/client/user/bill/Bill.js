import React from 'react';
import { Card, List, Typography, Tag, Divider, Image } from 'antd';
import { ShoppingCartOutlined, CreditCardOutlined, CalendarOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const invoicesData = [
    {
      "_id": "675d6ded147581c00273d323",
      "order": {
        "_id": "675d6ded147581c00273d31d",
        "user": "674a18f849eb611c0c715bec",
        "productItem": [
          {
            "product": "6733aff1b164eceb5bf5d822",
            "name": "Đồng hồ thông minh SamSung Watch",
            "quantity": 2,
            "images": "https://res.cloudinary.com/dpczlxs5i/image/upload/v1731440626/kltn/avtsk4bsjkozhualmklq.jpg",
            "price": 5990000,
            "memory": "Dung lượng mặc định",
            "color": "Trắng",
            "_id": "675d6ded147581c00273d31e"
          },
          {
            "product": "6733b121b164eceb5bf5d826",
            "name": "Laptop Acer Nitro 5",
            "quantity": 1,
            "images": "https://res.cloudinary.com/dpczlxs5i/image/upload/v1731440930/kltn/zdp2sandyeuhzij1ir7e.jpg",
            "price": 17990000,
            "memory": "16GB-512GB RTX4050",
            "color": "Black",
            "_id": "675d6ded147581c00273d31f"
          }
        ],
        "orderStatus": "PROGRESS",
        "infomationUser": {
          "address": "abc, Xã Mỹ Khánh, Huyện Phong Điền, Thành phố Cần Thơ",
          "phone": "0928213333",
          "name": "Nguyen Vinh Khang"
        },
        "paid": true,
        "billCode": "NCB",
        "total": 29970000,
        "createdAt": "2024-12-14T11:37:17.478Z",
        "updatedAt": "2024-12-14T11:37:17.478Z",
        "__v": 0
      },
      "billCode": "NCB",
      "total": 29970000,
      "paymentMethod": "VNPAY",
      "createdAt": "2024-12-14T11:37:17.484Z",
      "updatedAt": "2024-12-14T11:37:17.484Z",
      "__v": 0
    },
    {
      "_id": "675d6ded147581c00273d32f",
      "order": {
        "_id": "675d6ded147581c00273d327",
        "user": "674a18f849eb611c0c715bec",
        "productItem": [
          {
            "product": "6733aff1b164eceb5bf5d822",
            "name": "Đồng hồ thông minh SamSung Watch",
            "quantity": 2,
            "images": "https://res.cloudinary.com/dpczlxs5i/image/upload/v1731440626/kltn/avtsk4bsjkozhualmklq.jpg",
            "price": 5990000,
            "memory": "Dung lượng mặc định",
            "color": "Trắng",
            "_id": "675d6ded147581c00273d328"
          },
          {
            "product": "6733b121b164eceb5bf5d826",
            "name": "Laptop Acer Nitro 5",
            "quantity": 1,
            "images": "https://res.cloudinary.com/dpczlxs5i/image/upload/v1731440930/kltn/zdp2sandyeuhzij1ir7e.jpg",
            "price": 17990000,
            "memory": "16GB-512GB RTX4050",
            "color": "Black",
            "_id": "675d6ded147581c00273d329"
          }
        ],
        "orderStatus": "PROGRESS",
        "infomationUser": {
          "address": "abc, Xã Mỹ Khánh, Huyện Phong Điền, Thành phố Cần Thơ",
          "phone": "0928213333",
          "name": "Nguyen Vinh Khang"
        },
        "paid": true,
        "billCode": "NCB",
        "total": 29970000,
        "createdAt": "2024-12-14T11:37:17.495Z",
        "updatedAt": "2024-12-14T11:37:17.495Z",
        "__v": 0
      },
      "billCode": "NCB",
      "total": 29970000,
      "paymentMethod": "VNPAY",
      "createdAt": "2024-12-14T11:37:17.503Z",
      "updatedAt": "2024-12-14T11:37:17.503Z",
      "__v": 0
    }
  ];
  
const UserInvoices= () => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Title level={2} className="mb-6 text-center">Thông tin hóa đơn</Title>
      <List
        dataSource={invoicesData}
        renderItem={(invoice) => (
          <List.Item key={invoice._id}>
            <Card className="w-full" hoverable>
              <div className="flex justify-between items-center mb-4">
                <Title level={4}>Mã hóa đơn: {invoice.billCode}</Title>
                <Tag color="blue">{invoice.order.orderStatus}</Tag>
              </div>
              <div className="mb-4">
                <Text strong>Khách hàng: </Text>
                <Text>{invoice.order.infomationUser.name}</Text>
              </div>
              <div className="mb-4">
                <Text strong>Địa chỉ: </Text>
                <Text>{invoice.order.infomationUser.address}</Text>
              </div>
              <div className="mb-4">
                <Text strong>Số điện thoại: </Text>
                <Text>{invoice.order.infomationUser.phone}</Text>
              </div>
              <Divider />
              <List
                dataSource={invoice.order.productItem}
                renderItem={(item) => (
                  <List.Item key={item._id}>
                    <div className="flex items-center w-full">
                      <Image
                        src={item.images}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="object-cover mr-4"
                      />
                      <div className="flex-grow">
                        <Text strong>{item.name}</Text>
                        <div>
                          <Text>Số lượng: {item.quantity}</Text>
                          <Text className="ml-4">Màu: {item.color}</Text>
                          <Text className="ml-4">Bộ nhớ: {item.memory}</Text>
                        </div>
                        <Text>{formatCurrency(item.price)}</Text>
                      </div>
                    </div>
                  </List.Item>
                )}
              />
              <Divider />
              <div className="flex justify-between items-center">
                <div>
                  <div className="mb-2">
                    <ShoppingCartOutlined className="mr-2" />
                    <Text strong>Tổng cộng: </Text>
                    <Text>{formatCurrency(invoice.total)}</Text>
                  </div>
                  <div className="mb-2">
                    <CreditCardOutlined className="mr-2" />
                    <Text strong>Phương thức thanh toán: </Text>
                    <Text>{invoice.paymentMethod}</Text>
                  </div>
                  <div>
                    <CalendarOutlined className="mr-2" />
                    <Text strong>Ngày tạo: </Text>
                    <Text>{formatDate(invoice.createdAt)}</Text>
                  </div>
                </div>
                <Tag color={invoice.order.paid ? "green" : "red"}>
                  {invoice.order.paid ? "Đã thanh toán" : "Chưa thanh toán"}
                </Tag>
              </div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default UserInvoices;

