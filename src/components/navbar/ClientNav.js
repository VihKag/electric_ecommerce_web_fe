import React, {useEffect, useState } from "react";
import { Button, Dropdown, Menu} from "antd";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faHeart,
  faMountain,
  faSignIn,
} from "@fortawesome/free-solid-svg-icons";
import avatar from "../../assets/image/default_avatar.jpg";
import { useDispatch, useSelector } from "react-redux";
import {jwtDecode} from 'jwt-decode';
import { authJwtAsync } from "../../redux/slices/authSlice";
function ClientNav() {
  const menu = (
    <Menu
      items={[
        {
          label: <Link to="/user">Tài khoản</Link>,
          key: "0",
        },
        {
          label: <Link to="user/orders">Đơn hàng</Link>,
          key: "1",
        },
        {
          label: <Link to="user/setting">Cài đặt</Link>,
          key: "3",
        },
        {
          type: "divider",
        },
        {
          label: <Link to="/login">Logout</Link>,
          key: "4",
        },
      ]}
    />
  );
  const dispatch = useDispatch();
  useEffect(()=>{
    const token = localStorage.getItem('access_token');
    console.log("token: ",token);
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
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.error('Invalid token', error);
      }
    } 
  },[]);
  const isAuth = useSelector((state)=> state.auth.isAuth);
  const user = useSelector((state)=> state.auth.user);
  return (
    <div className="pl-1 flex items-center justify-between h-14 w-full max-w-[1200px]">
      <Link to="/" className="mr-4 md:mr-2 inline min-w-fit text-white">
        <FontAwesomeIcon icon={faMountain} className="size-6" />
        <span className="ml-1">Shop Name</span>
      </Link>
      <div className="relative mx-2 w-full hidden xs:block">
        <input
          type="search"
          placeholder="Tìm kiếm sản phẩm..."
          className="w-full py-2 pl-4 pr-2 rounded-md"
        />
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
          <Link
            to="/wishList"
            className="text-sm min-w-fit font-medium"
          >
            Yêu thích
          </Link>
        </Button>
        <Button type="ghost" size="small" className="rounded-full text-white">
          <FontAwesomeIcon icon={faCartShopping} className="size-5" />
          <Link
            to="/cart"
            className="text-sm min-w-fit font-medium"
          >
            Giỏ hàng
          </Link>
        </Button>
        {isAuth ? (
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button type="ghost" className="rounded-full text-white">
              <img
                src={avatar}
                alt="avatar"
                width={32}
                height={32}
                className="rounded-full object-cover"
              />
              <span className="">Account</span>
            </Button>
          </Dropdown>
        ) : (
          <Button type="ghost" size="small" className="rounded-full text-white">
            <FontAwesomeIcon icon={faSignIn} className="h-5 w-5" />
            <Link
              to="/auth/login"
              className="text-sm min-w-fit font-medium"
            >
              Đăng nhập
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
export default ClientNav;
