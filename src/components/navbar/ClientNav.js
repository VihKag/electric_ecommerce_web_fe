import React, { useEffect, useState } from "react";
import { Button, Dropdown, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faHeart,
  faMountain,
  faSearch,
  faSignIn,
} from "@fortawesome/free-solid-svg-icons";
import avatar from "../../assets/image/default_avatar.jpg";
import logoShop from "../../assets/icon/logoShop.png";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { authJwtAsync } from "../../redux/slices/authSlice";
function ClientNav() {
  const navigate = useNavigate();
  const items = [
    {
      key: "0",
      label: <Link to="/user">Tài khoản</Link>,
    },
    {
      key: "1",
      label: <Link to="user/orders">Đơn hàng</Link>,
    },
    {
      key: "3",
      label: <Link to="user/setting">Cài đặt</Link>,
    },
    {
      key: "5",
      type: "divider",
    },
    {
      key: "6",
      label: <Link to="/login">Đăng xuất</Link>,
    },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    console.log("token: ", token);
    if (token) {
      try {
        // Kiểm tra token hợp lệ (ví dụ: dùng jwtDecode để giải mã)
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        // Kiểm tra xem token đã hết hạn chưa
        if (decodedToken.exp > currentTime) {
          // Token hợp lệ, cập nhật trạng thái đăng nhập
          dispatch(authJwtAsync(token));
        } else {
          // Token hết hạn, xóa token khỏi localStorage
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const user = useSelector((state) => state.auth.user);
  return (
    <div className="pl-1 flex items-center justify-between h-14 w-full max-w-[1200px]">
      <div
        onClick={() => navigate("/")}
        className="mr-4 md:mr-2 min-w-fit text-white inline-flex items-center cursor-pointer"
      >
        <img src={logoShop} alt="logo" className="size-12" />
        <span className="ml-1 text-2xl font-bold font-mono">TechZone</span>
      </div>
      <div className="relative mx-2 w-full hidden xs:block">
        <div className="flex bg-white items-center rounded-md">
          <FontAwesomeIcon icon={faSearch} size="lg" className="mx-3" />
          <input
            type="search"
            placeholder="Tìm kiếm sản phẩm..."
            className="w-full py-2 mr-4 focus:outline-none focus:ring-0"
          />
        </div>
      </div>
      <nav className="hidden md:flex items-center justify-between text-white">
        <Button type="ghost" size="small" className="rounded-full text-white">
          <Link
            to="/about"
            className="text-sm min-w-fit font-medium hover:underline"
          >
            Giới thiệu
          </Link>
        </Button>
        <Button type="ghost" size="small" className="rounded-full text-white">
          <Link
            to="/contact"
            className="text-sm min-w-fit font-medium hover:underline"
          >
            Liên hệ
          </Link>
        </Button>
      </nav>
      <div className="flex items-center">
        <Button type="ghost" size="small" className="rounded-full text-white">
          <FontAwesomeIcon icon={faHeart} className="size-5" />
          <Link to="/wishList" className="text-sm min-w-fit font-medium">
            Yêu thích
          </Link>
        </Button>
        <Button type="ghost" size="small" className="rounded-full text-white">
          <FontAwesomeIcon icon={faCartShopping} className="size-5" />
          <Link to="/cart" className="text-sm min-w-fit font-medium">
            Giỏ hàng
          </Link>
        </Button>
        {isAuth ? (
          <Dropdown
            menu={{
              items,
            }}
            trigger={["click"]}
          >
            <Button type="ghost" className="rounded-full text-white">
              <div className="flex items-center">
                <img
                  src={user.image}
                  alt="avatar"
                  width={32}
                  height={32}
                  className="rounded-full object-cover"
                />
                <span className="ml-2">{user.username}</span>
              </div>
            </Button>
          </Dropdown>
        ) : (
          <Button type="ghost" size="small" className="rounded-full text-white">
            <FontAwesomeIcon icon={faSignIn} className="h-5 w-5" />
            <Link to="/auth/login" className="text-sm min-w-fit font-medium">
              Đăng nhập
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
export default ClientNav;
