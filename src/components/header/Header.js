import React, { useEffect, useState } from "react";
import { Button, Dropdown, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
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
import { authJwtAsync, logout } from "../../redux/slices/authSlice";
import { fetchCart } from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";
function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const user = useSelector((state) => state.auth.user);
  const [searchInput, setSearchInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleLogout = () => {
    setIsModalOpen(true);
  };
  // Hàm xác nhận logout
  const handleConfirmLogout = () => {
    setIsModalOpen(false);
    dispatch(logout()); // Gọi hành động logout để xóa dữ liệu và reset state
    toast.info("Đăng xuất thành công!");
    navigate("/"); // Chuyển hướng đến trang đăng nhập
  };

  // Hàm hủy bỏ logout
  const handleCancelLogout = () => {
    setIsModalOpen(false);
  };
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
      label: <div onClick={handleLogout}>Đăng xuất</div>,
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
      label: <Link to="/dong-ho">ĐỒng hồ</Link>,
    },
  ];

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
          //láy cart nếu đăng nhập bằng token thành công
          const user = JSON.parse(localStorage.getItem("user"));
          console.log(user);
          dispatch(fetchCart(user.id));
        } else {
          // Token hết hạn, xóa token khỏi localStorage
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, [dispatch]);
  const scrollToFooter = () => {
    document.querySelector("footer")?.scrollIntoView({ behavior: "smooth" });
  };
  const handleSearch = (e) => {
    if (e.key === "Enter" && searchInput.trim()) {
      // Điều hướng đến trang tìm kiếm với keyword
      const encodedKeyword = encodeURIComponent(searchInput.trim());
      navigate(`/product/search?keyword=${encodedKeyword}`);
    }
  };

  return (
    <div className="bg-primary px-4 py-2 sticky top-0 z-50 max-w-[1200px] md:min-w-fit mx-auto">
      <div className="flex justify-between items-center w-full lg:text-sm">
        {/* Logo */}
        <div
          className="flex items-center cursor-pointer min-w-fit"
          onClick={() => navigate("/")}
        >
          <img src={logoShop} alt="logo" className="w-10 h-10" />
          <span className="ml-2 text-xl text-white font-bold">TechZone</span>
        </div>

        <div className="hidden xs:block">
          <Dropdown
            menu={{ items: categoryItems }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <button className="flex text-white items-center font-semibold justify-between bg-red-500 py-2 px-6 gap-2 rounded-md">
              <FontAwesomeIcon icon={faBars} className="text-white" />
              <div>Danh mục</div>
            </button>
          </Dropdown>
        </div>

        {/* Search Bar */}
        <div className="hidden md:block w-full max-w-md">
          <div className="flex items-center bg-white rounded-full px-4">
            <FontAwesomeIcon icon={faSearch} className="text-gray-500 mr-2" />
            <input
              type="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Tìm kiếm sản phẩm..."
              className="w-full py-2 focus:outline-none"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center sm:space-x-4">
          {/* Dropdown menu for categories */}
          <div className="xs:hidden">
            <Dropdown
              menu={{ items: categoryItems }}
              trigger={["click"]}
              placement="bottomRight"
            >
              <Button
                shape="circle"
                icon={<FontAwesomeIcon icon={faBars} className="text-white" />}
                className="bg-transparent border-none hover:bg-gray-700"
              />
            </Dropdown>
          </div>

          {/* Yêu thích */}
          <button
            onClick={() => navigate("/wishList")}
            className="flex items-center text-white hover:underline px-2"
          >
            <span className="hidden xs:block text-sm font-medium">
              Yêu thích
            </span>
          </button>

          {/* Liên hệ */}
          <button
            onClick={scrollToFooter}
            className="flex items-center text-white hover:underline px-2"
          >
            <span className="hidden xs:block text-sm font-medium">Liên hệ</span>
          </button>

          <button
            onClick={() => navigate("/cart")}
            className="text-white flex items-center hover:bg-red-400 px-2 py-2 rounded-md bg-red-500"
          >
            <FontAwesomeIcon icon={faCartShopping} className="mr-1" />
            <span className="hidden xs:block text-sm font-medium">
              Giỏ hàng
            </span>
          </button>
          {isModalOpen && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded shadow-lg text-center">
                <p className="mb-4">Bạn có chắc chắn muốn đăng xuất không?</p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={handleConfirmLogout}
                    className="px-4 py-2 bg-primary text-white rounded w-20"
                  >
                    Có
                  </button>
                  <button
                    onClick={handleCancelLogout}
                    className="px-4 py-2 bg-gray-500 text-white rounded w-20"
                  >
                    Không
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* User Account or Login */}
          {isAuth ? (
            <Dropdown
              menu={{ items: userItems }}
              trigger={["click"]}
              placement="bottomRight"
            >
              <div className="flex items-center cursor-pointer pr-4 bg-red-500">
                <img
                  src={user?.image || "/default_avatar.jpg"}
                  alt="avatar"
                  className="w-8 h-8 rounded-full"
                />
                <div className="ml-1 text-white text-sm inline-block min-w-fit">
                  {user?.username || "User"}
                </div>
              </div>
            </Dropdown>
          ) : (
            <button
              onClick={() => navigate("/auth/login")}
              className="text-white flex items-center hover:bg-red-400 bg-red-500 px-2 py-2 rounded-md mr-1"
            >
              <FontAwesomeIcon icon={faSignIn} className="mr-1" />
              <div className="hidden xs:block text-sm font-medium">
                Đăng nhập
              </div>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="mt-2 md:hidden">
        <div className="flex items-center bg-white rounded-full px-4">
          <FontAwesomeIcon icon={faSearch} className="text-gray-500 mr-2" />
          <input
            type="search"
            placeholder="Tìm kiếm sản phẩm..."
            className="w-full py-2 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
export default Header;
