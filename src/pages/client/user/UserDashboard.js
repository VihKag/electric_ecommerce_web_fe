import React, { useEffect } from "react";
import { Avatar, Badge, Button, Card, Menu } from "antd";
import {
  HomeOutlined,
  HistoryOutlined,
  WalletOutlined,
  LinkOutlined,
  QuestionCircleOutlined,
  MessageOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
export default function UserDashboard() {
    const location = useLocation();
    const locationPath = location.pathname;
    useEffect(()=>{
        console.log(locationPath);
    });
  return (
    <div className="flex min-h-screen container pt-2">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md sticky">
        <Menu mode="inline" className="sticky top-20">
          <Menu.Item key="home" icon={<HomeOutlined />}>
            <Link to="/user">Trang chủ</Link>
          </Menu.Item>
          <Menu.Item key="orders" icon={<HistoryOutlined />}>
            <Link to="/user/orders">Lịch sử mua hàng</Link>
          </Menu.Item>
          <Menu.Item key="account" icon={<WalletOutlined />}>
            <Link to="/user/profile">Tài khoản của bạn</Link>
          </Menu.Item>
          <Menu.Item key="link" icon={<LinkOutlined />}>
            <Badge count="MỚI" offset={[10, 0]}>
              Liên kết tài khoản
            </Badge>
          </Menu.Item>
          <Menu.Item key="help" icon={<QuestionCircleOutlined />}>
            Hỗ trợ
          </Menu.Item>
          <Menu.Item key="feedback" icon={<MessageOutlined />}>
            Góp ý - Phản hồi
          </Menu.Item>
          <Menu.Item key="logout" icon={<LogoutOutlined />}>
            Thoát tài khoản
          </Menu.Item>
        </Menu>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-4">
        {<Outlet /> ? (
          <Outlet />
        ) : (
          <>
            <Card className="mb-8">
              <div className="flex items-center">
                <div className="flex items-center">
                  <Avatar size={64} src="/placeholder.svg?height=64&width=64" />
                  <div className="ml-4">
                    <h2 className="text-xl font-bold text-purple-700">
                      NGUYỄN VINH KHANG
                    </h2>
                    <p className="text-gray-600">0327447104</p>
                  </div>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <Card>
                <h3 className="text-3xl font-bold">3</h3>
                <p className="text-gray-600">đơn hàng</p>
              </Card>
              <Card>
                <h3 className="text-3xl font-bold">450K</h3>
                <p className="text-gray-600">Tổng tiền tích lũy</p>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
