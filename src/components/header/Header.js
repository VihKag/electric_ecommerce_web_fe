import React, { useEffect, useState } from "react";
import { Button, Dropdown, Menu, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCartShopping,
  faSearch,
  faSignIn,
} from "@fortawesome/free-solid-svg-icons";
import logoShop from "../../assets/icon/logoShop.png";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { authJwtAsync, logout } from "../../redux/slices/authSlice";
import { fetchCart, resetCart } from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";
import { categoryService } from "../../services/apiService";
function Header({ searchInput, setSearchInput, handleSearch }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const user = useSelector((state) => state.auth.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.productItem);
  const [categories, setCategories] = useState([]);
  const fetchCategory = async () => {
    try {
      const response = await categoryService.getAllCategories();
      console.log("data category: ", response.data.data);
      setCategories(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchCategory();
  }, []);
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCart(user.id));
    } else {
    }
  }, [dispatch, user]);
  const handleLogout = () => {
    setIsModalOpen(true);
  };
  // Hàm xác nhận logout
  const handleConfirmLogout = () => {
    setIsModalOpen(false);
    dispatch(resetCart());
    dispatch(logout()); // Gọi hành động logout để xóa dữ liệu và reset state
    message.info("Đăng xuất thành công!");
    navigate("/"); // Chuyển hướng đến trang đăng nhập
  };
  const handleToCart = () => {
    if(!user){
      message.info("Vui lòng đăng nhập");
      navigate('/auth/login');
      return;
    }
    navigate('/cart');
  }
  // Hàm hủy bỏ logout
  const handleCancelLogout = () => {
    setIsModalOpen(false);
  };

  const categoryItems = categories.map((item, index) => ({
    key: `cate${item._id}`,
    label: <Link to={`/category/${item._id}`}>{item.name}</Link>,
  }));
  const userItems = [
    {
      key: "user0",
      label: <Link to="/user/profile">Tài khoản</Link>,
    },
    {
      key: "user1",
      label: <Link to="user/orders">Đơn hàng</Link>,
    },
    {
      key: "user2",
      type: "divider",
    },
    {
      key: "user3",
      label: <div onClick={handleLogout}>Đăng xuất</div>,
    },
  ];
  useEffect(() => {
    const token = localStorage.getItem("access_token");
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
          localStorage.removeItem("user");
          localStorage.removeItem("access_token");
        }
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, [dispatch]);
  const scrollToFooter = () => {
    document.querySelector("footer")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="bg-primary px-4 max-w-[1200px] mx-auto">
      {/* Logo */}
      <div className="flex xs:justify-between w-full md:w-full items-center text-sm">
        <div
          className="items-center cursor-pointer mr-2 block"
          onClick={() => navigate("/")}
        >
          <div className="text-xl text-white font-semibold sm:font-bold flex items-center gap-2">
            <img src={logoShop} alt="logo" className="size-8 sm:size-10" />
            <div className="hidden xs:block min-w-fit">TecKZone</div>
          </div>
        </div>

        <div className="hidden xs:block ">
          <Dropdown
            menu={{ items: categoryItems }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <button className="flex text-white items-center font-semibold justify-between py-2 px-4 gap-2 rounded-md mx-1 bg-red-500">
              <FontAwesomeIcon icon={faBars} className="text-white size-5" />
              <div>Danh mục</div>
            </button>
          </Dropdown>
        </div>

        {/* Search Bar */}
        <div className="hidden md:block w-full md:max-w-[250px] xl:max-w-sm">
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
            className="hidden md:flex items-center text-white hover:underline px-2"
          >
            <span className="hidden xs:block text-sm font-medium">
              Yêu thích
            </span>
          </button>

          {/* Liên hệ */}
          <button
            onClick={scrollToFooter}
            className="hidden md:flex items-center text-white hover:underline px-2"
          >
            <span className="hidden xs:block text-sm font-medium">Liên hệ</span>
          </button>

          <button
            onClick={handleToCart}
            className="text-white flex items-center hover:bg-red-400 px-2 py-2 rounded-md bg-red-500"
          >
            <FontAwesomeIcon icon={faCartShopping} className="mr-1 size-5" />
            <div className="hidden xs:block text-sm font-medium">Giỏ hàng</div>
            {cartItems.length > 0 && (
              <span className="relative bg-yellow-500 text-white text-xs font-bold w-5 h-5 ml-1 flex items-center justify-center rounded-full">
                {cartItems.length}
              </span>
            )}
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
              className="p-0 m-0"
            >
              <button className="flex ml-1 items-center cursor-pointer px-2 py-2 rounded-md bg-red-500">
                <img
                  src={user?.image || "/default_avatar.jpg"}
                  alt="avatar"
                  className="w-5 h-5 rounded-full"
                />
                <div className="ml-1 font-medium text-white text-sm inline-block min-w-fit">
                  {user?.username}
                </div>
              </button>
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
      <div className="mt-2 max-w-[760px] md:hidden">
        <div className="flex items-center">
          <div className="bg-white flex items-center w-full rounded-xl mr-4 px-4">
            <FontAwesomeIcon icon={faSearch} className="text-gray-500 mr-2" />
            <input
              type="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Tìm kiếm sản phẩm..."
              className="w-full py-2 focus:outline-none rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Header;
