import { faEye, faEyeSlash, faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { memo, useState } from "react";
import { Link } from "react-router-dom";
import LogoGG from "../../assets/icon/logoGG.png";
import LogoFb from "../../assets/icon/logoFb.png";

function Login() {
  const [frmLogin, setFrmLogin] = useState({
    username: "",
    Password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <div className="mx-auto my-6">
        {/* <img className="mx-auto w-32 h-32 rounded-full" src={LogoShop} alt="Logo web" /> */}
        <h2 className="mx-auto w-max">Đăng nhập</h2>
      </div>

      <div className="max-w-[700px] min-w-[280px] mx-auto pb-10">
        <div className="flex items-center gap-4 justify-center">
          <button className="flex w-48 h-14 items-center justify-center gap-3.5 rounded-lg border-2 border-stroke bg-gray p-4 font-bold hover:bg-opacity-50">
            <span>
              <img src={LogoGG} alt="logo google" className="h-6" />
            </span>
            Google
          </button>

          <button className="flex w-48 h-14 items-center justify-center rounded-lg border-2 border-stroke bg-gray p-4 font-bold hover:bg-opacity-50">
            <span>
              <img src={LogoFb} alt="logo google" className="h-6" />
            </span>
            Facebook
          </button>
        </div>

        <div className="gap-2 flex items-center mx-auto w-3/5 my-8">
          <hr className="w-full h-[1.5px] bg-gray-300" />
          hoặc
          <hr className="w-full h-[1.5px] bg-gray-300" />
        </div>

        <form>
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

          <div className="mb-4">
            <label className="mb-2.5 block font-medium text-black">
              Mật khẩu
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="on"
                placeholder="Nhập mât khẩu"
                required
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none"
              />
              <span className="absolute right-4 top-4 cursor-pointer">
                <FontAwesomeIcon
                  onClick={togglePasswordVisibility}
                  icon={showPassword ? faEye : faEyeSlash}
                  className="text-gray-400"
                  id="icon-password"
                />
              </span>
            </div>
            <div className="text-secondary m-2 justify-end flex hover:text-hover">
              <Link to="/auth/restore-password">quên mật khẩu?</Link>
            </div>
          </div>
          <div>
            <input
              type="submit"
              value="Đăng nhập"
              className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white font-bold transition hover:bg-opacity-90"
            />
          </div>

          <div className="mt-6 text-center">
            <p>
              Bạn chưa có tài khoản?{" "}
              <Link to="/auth/register" className="hover:text-blue-500 text-primary font-bold">
                Đăng ký
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
export default Login;
