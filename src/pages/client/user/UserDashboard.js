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
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/slices/authSlice";
export default function UserDashboard() {
    const user = JSON.parse(localStorage.getItem("user"));
    const location = useLocation();
    const locationPath = location.pathname;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = () => {
      dispatch(logout()); // Gọi hành động logout để xóa dữ liệu và reset state
      navigate("/"); // Chuyển hướng đến trang đăng nhập
    };
    useEffect(()=>{
        console.log(locationPath);
    });
  return (
    <div className="flex min-h-screen max-w-[1200px] container pt-2">
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
          <Menu.Item key="help" icon={<QuestionCircleOutlined />}>
            Hỗ trợ
          </Menu.Item>
          <Menu.Item key="logout" onClick={handleLogout} icon={<LogoutOutlined />}>
            Đăng xuất
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
