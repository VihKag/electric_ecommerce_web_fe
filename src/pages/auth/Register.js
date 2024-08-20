import { faEyeSlash, faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import LogoGG from "../../assets/icon/logoGG.png"
import LogoShop from "../../assets/image/electric.jpg";
function Register() {
  return (
    <>
      <div className="mx-auto my-6">
        <img className="mx-auto w-32 h-32 rounded-full" src={LogoShop} alt="Logo web"/>
        <h2 className="mx-auto w-max">Đăng ký</h2>
      </div>
      <form className="max-w-[700px] min-w-[280px] mx-auto pb-10">
      <div className="mb-4">
          <label className="mb-2.5 block font-medium text-black">
            Họ tên
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Nhập tài khoản"
              required
              
              className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none"
            />
            <span className="absolute right-4 top-4">
              <FontAwesomeIcon icon={faUser} className="text-gray-400" />
            </span>
          </div>
        </div>

        <div className="mb-4">
          <label className="mb-2.5 block font-medium text-black">
            Số điện thoại
          </label>
          <div className="relative">
            <input
              type="tel"
              placeholder="Nhập tài khoản"
              required
              
              className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none"
            />
            <span className="absolute right-4 top-4">
              <FontAwesomeIcon icon={faUser} className="text-gray-400" />
            </span>
          </div>
        </div>

        <div className="mb-4">
          <label className="mb-2.5 block font-medium text-black">
            Tài khoản
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Nhập tài khoản"
              required
              
              className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none"
            />
            <span className="absolute right-4 top-4">
              <FontAwesomeIcon icon={faUser} className="text-gray-400" />
            </span>
          </div>
        </div>

        <div className="mb-6">
          <label className="mb-2.5 block font-medium text-black">
            Mật khẩu
          </label>
          <div className="relative">
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="on"
              placeholder="Nhập mât khẩu"
              required
              className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none"
            />
            <span className="absolute right-4 top-4 cursor-pointer">
              <FontAwesomeIcon icon={faEyeSlash} className="text-gray-400" />
            </span>
          </div>
        </div>

        <div className="mb-6">
          <label className="mb-2.5 block font-medium text-black">
            Nhập lại mật khẩu
          </label>
          <div className="relative">
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="on"
              placeholder="Nhập lại mât khẩu"
              required
              className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none"
            />
            <span className="absolute right-4 top-4 cursor-pointer">
              <FontAwesomeIcon icon={faEyeSlash} className="text-gray-400" />
            </span>
          </div>
        </div>


        <div className="mb-5">
          <input
            type="submit"
            value="Đăng ký"
            className="w-full cursor-pointer rounded-lg border border-blue-500 bg-blue-500 p-4 text-white font-bold transition hover:bg-opacity-90"
          />
        </div>

        <div className="mt-6 text-center">
          <p>
            Bạn đã có tài khoản?{" "}
            <Link to="/login" className="text-blue-500 font-bold">
              Đăng nhập
            </Link>
          </p>
        </div>
      </form>
    </>
  );
}
export default Register;
