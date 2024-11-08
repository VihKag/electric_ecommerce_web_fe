import React, { useState } from "react";
import { Avatar, Badge, Button, Dropdown, Layout, Menu, Space } from "antd";
import { Link, Outlet } from "react-router-dom";
import Icon, {
  UserOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  FileOutlined,
  LogoutOutlined,
  SettingOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BellTwoTone,
  PoweroffOutlined
} from "@ant-design/icons";
import logoShop from "../assets/icon/logoShop.png";
const { Header, Content, Footer, Sider } = Layout;

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const userMenu = (
    <Menu>
      <Menu.Item
        key="1"
        icon={<Avatar icon={<UserOutlined className="text-2xl" />} size={40} />}
      >
        <div className="pb-2 flex-col">
          <div className="text-sm font-semibold pb-1">Username</div>
          <div className="text-xs">User@gmail.com</div>
        </div>
      </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />}>
        Tài khoản
      </Menu.Item>
      <Menu.Item key="5" icon={<SettingOutlined />}>
        Settings
      </Menu.Item>
      <Menu.Item key="6" icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout className="min-h-screen">
      <Sider
        trigger={null}
        tri
        collapsible
        collapsedWidth={64}
        breakpoint="lg"
        collapsed={collapsed}
      >
        <div className="p-2 text-white font-bold text-xl inline-flex items-center gap-2 my-2 relative">
          <span className="flex-none">
            <img src={logoShop} alt="logo" className="size-12" />
          </span>
          <span className={collapsed ? `opacity-0 transition-opacity` :  `opacity-100 transition-opacity`}>
            TeckZone
          </span>
        </div>
        <Menu
          theme="dark"
          className="text-base"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <ShoppingOutlined />,
              label: <Link to="/admin/products">Products</Link>,
            },
            {
              key: "2",
              icon: <UserOutlined />,
              label: <Link to="/admin/users">Users</Link>,
            },
            {
              key: "3",
              icon: <ShoppingCartOutlined />,
              label: <Link to="/admin/orders">Orders</Link>,
            },
            {
              key: "4",
              icon: <FileOutlined />,
              label: <Link to="/admin/bills">Bills</Link>,
            },
            {
              key: "5",
              icon: <PoweroffOutlined />,
              label: <div>Dăng xuất</div>,
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background px-0 flex bg-inherit items-center justify-between select-none border-b-2">
          <Button
            type="link"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              color: "#000",
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div className="px-6 flex items-center justify-center">
            <div className="mr-4 p-2" color="default" variant="text">
              <div className="flex items-center rounded-full py-2 px-2 hover:bg-gray-300 hover:cursor-pointer active:bg-gray-100 focus:bg-gray-300 selection:bg-gray-300">
                <Badge count={100}>
                  <BellTwoTone className="text-3xl" />
                </Badge>
              </div>
            </div>
            <Dropdown
              overlay={userMenu}
              trigger={["click"]}
              placement="bottomRight"
              arrow
            >
              <Avatar icon={<UserOutlined className="text-3xl" />} size={48} />
            </Dropdown>
          </div>
        </Header>
        <Content className="px-0">
          <div className="px-6 py-2 min-h-[360px] site-layout-background">
            <Outlet />
          </div>
        </Content>
        <Footer className="text-center">
          Admin Ecommerce ©2024 Created by Khang/Tri
        </Footer>
      </Layout>
    </Layout>
  );
}
