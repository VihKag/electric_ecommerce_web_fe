import { faEyeSlash, faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import LogoGG from "../../assets/icon/logoGG.png"
function Login() {
  return (
    <>
      <div className="mx-auto my-4">
        <img className="mx-auto w-max" src="" alt="Logo web"/>
        <h2 className="mx-auto w-max">Đăng nhập</h2>
      </div>
      <form className="max-w-[700px] min-w-[280px] mx-auto">
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

        <div className="mb-5">
          <input
            type="submit"
            value="Đăng nhập"
            className="w-full cursor-pointer rounded-lg border border-blue-500 bg-blue-500 p-4 text-white font-bold transition hover:bg-opacity-90"
          />
        </div>

        <button className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-4 font-bold hover:bg-opacity-50">
          <span>
            <img src={LogoGG} alt="logo google" className="w-6 h-6"/>
          </span>
          Đăng nhập với Google
        </button>

        <div className="mt-6 text-center">
          <p>
            Bạn chưa có tài khoản?{" "}
            <Link to="/register" className="text-blue-500 font-bold">
              Đăng ký
            </Link>
          </p>
        </div>
      </form>
    </>
  );
}
export default Login;
