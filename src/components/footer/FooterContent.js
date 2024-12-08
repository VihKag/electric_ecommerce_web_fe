import { Content } from "antd/es/layout/layout";
import { Typography, Layout, Breadcrumb, Space, Card } from "antd";
import Title from "antd/es/skeleton/Title";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { HomeOutlined } from '@ant-design/icons';
const content = {
  terms: {
    title: "Điều khoản và điều kiện giao dịch",
    description: "Nội dung điều khoản và điều kiện giao dịch chung...",
  },
  privacy: {
    title: "Chính sách bảo mật",
    description: "Nội dung chính sách bảo mật của website...",
  },
  return: {
    title: "Chính sách trả hàng",
    description: "Nội dung chính sách trả hàng và hoàn tiền...",
  },
};

export default function FooterContent() {
  const { page } = useParams();
  const { Content } = Layout;
  const { Title, Paragraph } = Typography;
  const getContent = (page) => {
    switch (page) {
        case 'about':
          return {
            title: 'Our Story',
            content: 'We are a leading electronics store dedicated to providing high-quality products and excellent customer service. Founded in 2010, we have grown from a small local shop to a nationwide online retailer, always putting our customers first.',
            icon: '📖'
          };
        case 'contact':
          return {
            title: 'Contact Us',
            content: 'We are here to help! Get in touch with our customer support team at support@electronicsstore.com or call us at 1-800-123-4567. Our support hours are Monday to Friday, 9 AM to 6 PM EST.',
            icon: '📞'
          };
        case 'faq':
          return {
            title: 'Frequently Asked Questions',
            content: 'Find answers to common questions about our products, shipping, and return policies. If you can not find what you are looking for, do not hesitate to contact our support team.',
            icon: '❓'
          };
        case 'shipping':
          return {
            title: 'Shipping Information',
            content: 'We offer free shipping on orders over $50. Standard shipping takes 3-5 business days. For expedited shipping options, please check our shipping calculator at checkout.',
            icon: '🚚'
          };
        case 'terms':
          return {
            title: 'Terms of Service',
            content: 'Please read our terms of service carefully before using our website or making a purchase. By using our services, you agree to be bound by these terms.',
            icon: '📜'
          };
        case 'privacy':
          return {
            title: 'Privacy Policy',
            content: 'We respect your privacy and are committed to protecting your personal information. Our privacy policy outlines how we collect, use, and safeguard your data.',
            icon: '🔒'
          };
        default:
          return {
            title: '404 - Page Not Found',
            content: 'The page you are looking for does not exist. Please check the URL or navigate back to our homepage.',
            icon: '🚫'
          };
      }
  };

  const { title, content, icon } = getContent(page || '');

  return (
    <Content style={{ padding: '0 50px', marginTop: 64, marginBottom: 64 }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>
          <Link to="/">
            <Space>
              <HomeOutlined />
              Home
            </Space>
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{title}</Breadcrumb.Item>
      </Breadcrumb>
      <Card 
        style={{ 
          minHeight: 'calc(100vh - 64px - 70px - 32px - 64px)',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
        }}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div style={{ textAlign: 'center', fontSize: '48px' }}>
            {icon}
          </div>
          <Title level={2} style={{ textAlign: 'center' }}>{title}</Title>
          <Paragraph style={{ fontSize: '16px', lineHeight: '1.8' }}>
            {content}
          </Paragraph>
        </Space>
      </Card>
    </Content>
  );
}
