import {
  faFacebook,
  faInstagram,
  faTiktok,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 pb-6 bg-slate-50 text-gray-300 py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* About Us */}
        <div>
          <h4 className="text-xl font-semibold mb-4">
            Về chúng tôi
          </h4>
          <ul className="space-y-2">
            <li>
              <Link to="/our/about" >
                Giới thiệu
              </Link>
            </li>
            <li>
              <Link to="/our/contact" >
                Liên hệ
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h4 className="text-xl font-semibold mb-4">
            Dịch vụ khách hàng
          </h4>
          <ul className="space-y-2">
            <li>
              <Link to="/our/faq" >
                Câu hỏi thường gặp (FAQ)
              </Link>
            </li>
            <li>
              <Link to="/our/shipping" >
                Thông tin giao hàng
              </Link>
            </li>
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h4 className="text-xl font-semibold mb-4">Chính sách</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/our/terms" >
                Điều khoản dịch vụ
              </Link>
            </li>
            <li>
              <Link to="/our/privacy" >
                Chính sách bảo mật
              </Link>
            </li>
          </ul>
        </div>

        {/* Connect with Us */}
        <div>
          <h4 className="text-xl font-semibold mb-4">
            Kết nối với chúng tôi
          </h4>
          <ul className="space-x-2 flex">
            <li>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faFacebook} size="xl"/>
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                
              >
                <FontAwesomeIcon icon={faInstagram} size="xl"/>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-8">
        <p className="text-sm text-gray-400">
          © 2024 Cửa hàng điện tử. All rights reserved.
        </p>
      </div>
    </div>
  );
}
