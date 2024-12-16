import React, { Suspense, useEffect, useMemo, useState } from "react";
import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  Layout,
  Menu,
  message,
  Spin,
} from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  UserOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  FileOutlined,
  LogoutOutlined,
  SettingOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PoweroffOutlined,
  PieChartOutlined,
  MedicineBoxOutlined,
  UnorderedListOutlined,
  TagsOutlined,
  TeamOutlined,
  FilterOutlined,
  CodeSandboxOutlined,
  CommentOutlined,
  BorderOutlined,
} from "@ant-design/icons";
import logoShop from "../assets/icon/logoShop.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/adminSlice";
const { Header, Content, Footer, Sider } = Layout;

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.admin.user);

  const [collapsed, setCollapsed] = useState(false);
  const menuItemsMap = useMemo(() => {
    return new Map([
      ["/admin/products", "1"],
      ["/admin/add-product", "2"],
      ["/admin/categories", "3"],
      ["/admin/brands", "4"],
      ["/admin/users", "6"],
      ["/admin/staffs", "7"],
      ["/admin/orders", "8"],
      ["/admin/bills", "9"],
      ["/admin/reviews", "10"],
      ["/admin/pos", "11"],
      ["/admin/filters", "12"],
      ["/admin/banners", "13"]
    ]);
  }, []);
  // Tự động thu gọn sidebar khi màn hình nhỏ hơn md
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true); // Thu gọn khi nhỏ hơn md
      }
    };
    handleResize(); // Kiểm tra ngay khi component mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // Kiểm tra nếu user null và chuyển hướng đến trang đăng nhập
  useEffect(() => {
    if (!user) {
      message.error(
        "Bạn chưa đăng nhập! Vui lòng đăng nhập để truy cập trang quản trị."
      );
      navigate("/login"); // Điều hướng đến trang login
    }
  }, [user, navigate]);
  const handleLogout = () =>{
    dispatch(logout);
    message.info("Đăng xuất thành công!");
    navigate("/login");
    
  }
  const userMenu = {
    items: [
      {
        key: "user1",
        label: (
          <div className="pb-2 flex-col">
            <div className="text-sm font-semibold pb-1">
              {user?.username || null}
            </div>
            <div className="text-xs">{user?.email || null}</div>
          </div>
        ),
        icon: <Avatar icon={<UserOutlined className="text-2xl" />} size={40} />,
      },
      {
        key: "user2",
        label: "Tài khoản",
        icon: <UserOutlined />,
      },
      {
        key: "user3",
        label: "Cài đặt",
        icon: <SettingOutlined />,
      },
      {
        key: "user4",
        label: <div onClick={handleLogout}>Đăng xuất</div>,
        icon: <LogoutOutlined />,
      },
    ],
  };
  // Tìm menu item nào phù hợp nhất với URL hiện tại
  const selectedKey = menuItemsMap.get(location.pathname) || "0";

  return (
    <Suspense fallback={<Spin size="large" />}>
      <Layout className="min-h-screen font-nunito">
        <Sider
          trigger={null}
          collapsible
          collapsedWidth={64}
          breakpoint="md"
          collapsed={collapsed}
        >
          <div
            onClick={() => navigate("/admin")}
            className="p-2 text-white font-bold text-xl inline-flex items-center gap-2 my-2 relative cursor-pointer"
          >
            <span className="flex-none">
              <img src={logoShop} alt="logo" className="size-12" />
            </span>
            <span
              className={
                collapsed
                  ? `opacity-0 transition-opacity`
                  : `opacity-100 transition-opacity`
              }
            >
              TecKZone
            </span>
          </div>
          <Menu
            theme="dark"
            className="text-sm"
            mode="inline"
            selectedKeys={[selectedKey]}
            defaultSelectedKeys={["0"]}
            items={[
              {
                key: "g1",
                type: "group",
                label: collapsed ? (
                  <hr />
                ) : (
                  <div className="font-semibold">Inventory</div>
                ),
                children: [
                  {
                    key: "1",
                    icon: <ShoppingOutlined />,
                    label: <Link to="/admin/products">Products</Link>,
                  },
                  {
                    key: "2",
                    icon: <MedicineBoxOutlined />,
                    label: <Link to="/admin/add-product">Create Product</Link>,
                  },
                  {
                    key: "3",
                    icon: <UnorderedListOutlined />,
                    label: <Link to="/admin/categories">Categories</Link>,
                  },
                  {
                    key: "4",
                    icon: <TagsOutlined />,
                    label: <Link to="/admin/brands">Brands</Link>,
                  },
                  {
                    key: "6",
                    icon: <UserOutlined />,
                    label: <Link to="/admin/users">Users</Link>,
                  },
                  {
                    key: "7",
                    icon: <TeamOutlined />,
                    label: <Link to="/admin/staffs">Staffs</Link>,
                  },
                  {
                    key: "8",
                    icon: <ShoppingCartOutlined />,
                    label: <Link to="/admin/orders">Orders</Link>,
                  },
                  {
                    key: "9",
                    icon: <FileOutlined />,
                    label: <Link to="/admin/bills">Bills</Link>,
                  },
                  {
                    key: "10",
                    icon: <CommentOutlined />,
                    label: <Link to="/admin/reviews">Reviews</Link>,
                  },
                ],
              },
              {
                key: "g2",
                label: collapsed ? (
                  <hr />
                ) : (
                  <div className="font-semibold">Sales</div>
                ),
                icon: <PieChartOutlined />,
                type: "group",
                children: [
                  {
                    key: "11",
                    icon: <CodeSandboxOutlined />,
                    label: <Link to="/admin/pos">POS</Link>,
                  },
                  {
                    key: "12",
                    icon: <FilterOutlined />,
                    label: <Link to="/admin/filters">Filters</Link>,
                  },
                  {
                    key: "13",
                    icon: <BorderOutlined/>,
                    label: <Link to="/admin/banners">Banner</Link>,
                  }
                ],
              },
              {
                key: "logout",
                icon: <PoweroffOutlined />,
                label: <div>Log out</div>,
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

                </div>
              </div>
              <Dropdown
                menu={userMenu}
                trigger={["click"]}
                placement="bottomRight"
                arrow
              >
                <Avatar
                  src={user?.image || null}
                  className="rounded-full bg-slate-200 p-1"
                  size={48}
                />
              </Dropdown>
            </div>
          </Header>
          <Content className="px-0 overflow-y-auto">
            <div className="px-6 py-2 min-h-[360px] site-layout-background">
              <Outlet />
            </div>
          </Content>
          <Footer className="text-center">
            Admin Ecommerce ©2024 Created by Khang/Tri
          </Footer>
        </Layout>
      </Layout>
    </Suspense>
  );
}
