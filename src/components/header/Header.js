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
function Header() {
  const navigate = useNavigate();
  const userItems = [
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
  const categoryItems = [
    {
      key: "cate1",
      label: <Link to="/tivi">Tài khoản</Link>,
    },
    {
      key: "cate2",
      label: <Link to="/laptop">Đơn hàng</Link>,
    },
    {
      key: "cate3",
      label: <Link to="/dien-thoai">Cài đặt</Link>,
    },
    {
      key: "cate4",
      label: <Link to="/camera">Cài đặt</Link>,
    },
    {
      key: "cate5",
      label: <Link to="/pc">Đăng xuất</Link>,
    },
    {
      key: "cate6",
      label: <Link to="/tablet">Đơn hàng</Link>,
    },
    {
      key: "cate7",
      label: <Link to="/loa">Cài đặt</Link>,
    },
    {
      key: "cate8",
      label: <Link to="/tai-nghe">Cài đặt</Link>,
    },
    {
      key: "cate9",
      label: <Link to="/phu-kien">Đăng xuất</Link>,
    },
    {
      key: "cate10",
      label: <Link to="/do-gia-dung">Cài đặt</Link>,
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
      <div>
      <Dropdown
            menu={{
              items: categoryItems,
            }}
            trigger={["click"]}
          >
            <button className="rounded-full text-white min-w-fit flex items-center">
              Danh mục
            </button>
          </Dropdown>
      </div>
      <div className="relative mx-2 w-full max-w-[540px] hidden xs:block">
        <div className="flex bg-white items-center rounded-xl">
          <FontAwesomeIcon icon={faSearch} size="lg" className="mx-3" />
          <input
            type="search"
            placeholder="Tìm kiếm sản phẩm..."
            className="w-full py-2 mr-4 focus:outline-none focus:ring-0"
          />
        </div>
      </div>
      <nav className="hidden md:flex-1 min-w-fit md:flex md:items-center md:justify-around text-white mx-2 gap-2">

          <button className="rounded-full text-white min-w-fit">
            <Link
              to="/about"
              className="text-sm min-w-fit font-medium hover:underline inline"
            >
              Giới thiệu
            </Link>
          </button>

          <button className="rounded-full text-white min-w-fit">
            <Link
              to="/contact"
              className="text-sm min-w-fit font-medium hover:underline inline"
            >
              Liên hệ
            </Link>
          </button>

          <button className="rounded-full text-white min-w-fit">
            <Link
              to="/wishList"
              className="text-sm min-w-fit font-medium hover:underline inline"
            >
              Yêu thích
            </Link>
          </button>

      </nav>
      <div className="flex items-center">
        <button className="rounded-full text-white min-w-fit flex items-center mr-4">
          <FontAwesomeIcon icon={faCartShopping} className="size-5" />
          <Link to="/cart" className="text-sm min-w-fit font-medium ml-2">
            Giỏ hàng
          </Link>
        </button>
        {isAuth ? (
          <Dropdown
            menu={{
              items:userItems,
            }}
            trigger={["click"]}
          >
            <button className="rounded-full text-white min-w-fit flex items-center">
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
            </button>
          </Dropdown>
        ) : (
          <button className="rounded-full text-white min-w-fit flex items-center">
            <FontAwesomeIcon icon={faSignIn} className="h-5 w-5" />
            <Link
              to="/auth/login"
              className="text-sm min-w-fit font-medium ml-2"
            >
              Đăng nhập
            </Link>
          </button>
        )}
      </div>
    </div>
  );
}
export default Header;
