import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import {
  UserOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  FileOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

export default function AdminLayout() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<ShoppingOutlined />}>
            <Link to="/admin/products">Products</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link to="/admin/users">Users</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<ShoppingCartOutlined />}>
            <Link to="/admin/orders">Orders</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<FileOutlined />}>
            <Link to="/admin/bills">Bills</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="p-0 site-layout-background" />
        <Content className='py-4 px-0'>
          <div className="p-6 min-h-[360px] site-layout-background">
            <Outlet />
          </div>
        </Content>
        <Footer className="text-center">Admin Ecommerce ©2024 Created by Khang/Tri</Footer>
      </Layout>
    </Layout>
  );
}