import React, { lazy, useState } from "react";
import { Button, Dropdown, Space } from "antd";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCartShopping,
  faHeart,
  faMountain,
  faSignIn,
} from "@fortawesome/free-solid-svg-icons";
import avatar from "../../assets/image/default_avatar.jpg";
const items = [
  {
    label: <Link to="/profile">Profile</Link>,
    key: "0",
  },
  {
    label: <Link to="/orders">Orders</Link>,
    key: "1",
  },
  {
    label: <Link to="/setting">Setting</Link>,
    key: "3",
  },
  {
    type: "divider",
  },
  {
    label: <Link to="/login">Logout</Link>,
    key: "4",
  },
];



function ClientNav() {
  const [authen, setAuthen] = useState(false);
  return (
      <div className="pl-1 flex items-center justify-between h-14 w-full max-w-[1200px]">
        <Link href="#" className="mr-4 md:mr-2 inline min-w-fit text-white">
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
        <nav className="ml-auto hidden md:flex items-center justify-between mx-2 gap-3 text-white">
          <Link href="#" className="text-sm font-medium hover:underline">
            Home
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline">
            Shop
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline">
            About
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline">
            Contact
          </Link>
        </nav>
        <div className="flex items-center">
          <Button type="ghost" size="icon" className="rounded-full text-white">
            <FontAwesomeIcon icon={faHeart} className="size-5" />
            <span className="whitespace-nowrap">Wishlist</span>
          </Button>
          <Button type="ghost" size="icon" className="rounded-full text-white">
            <FontAwesomeIcon icon={faCartShopping} className="size-5"/>
            <span className="whitespace-nowrap">Cart</span>
          </Button>
          {authen ? (
            <Dropdown menu={{ items }} trigger={["click"]}>
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
            <Button type="ghost" size="icon" className="rounded-full text-white">
            <FontAwesomeIcon icon={faSignIn} className="h-5 w-5" />
            <span className="whitespace-nowrap">Đăng nhập</span>
          </Button>
          )}
        </div>
      </div>
  );
}
export default ClientNav;

