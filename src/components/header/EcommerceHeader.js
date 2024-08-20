import React, { lazy } from "react";
import { Button, Dropdown, Space } from "antd";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faHeart,
  faMountain,
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
function Header() {
  return (
    <>
      <div className="container px-4 md:px-6 flex items-center h-14 md:h-16">
        <Link href="#" className="mr-4 md:mr-6">
          <FontAwesomeIcon icon={faMountain} className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <div className="relative flex-1 max-w-md">
          <input
            type="search"
            placeholder="Tìm kiếm sản phẩm..."
            className="w-full py-2 pl-4 pr-2 rounded-md"
          />
        </div>
        <nav className="ml-auto hidden md:flex items-center gap-4">
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
        <div className="ml-4 md:ml-6 flex items-center gap-2">
          <Button type="ghost" size="icon" className="rounded-full">
            <FontAwesomeIcon icon={faHeart} className="h-5 w-5" />
            <span className="sr-only">Wishlist</span>
          </Button>
          <Button type="ghost" size="icon" className="rounded-full">
            <FontAwesomeIcon icon={faCartShopping} className="h-5 w-5" />
            <span className="sr-only">Cart</span>
          </Button>
          <Dropdown menu={{ items }} trigger={["click"]}>
            <Button type="ghost" className="rounded-full">
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
        </div>
      </div>
    </>
  );
}
export default Header;
