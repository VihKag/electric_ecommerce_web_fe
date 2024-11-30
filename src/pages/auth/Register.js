import { faEyeSlash, faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoGG from "../../assets/icon/logoGG.png";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import LogoFb from "../../assets/icon/logoFb.png";
import { useForm } from "react-hook-form";
import { authService } from "../../services/apiService";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      contact: "",
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    // Bỏ confirm
    const { confirmPassword, ...userInfor } = data;

    try {
      const response = await authService.register(userInfor);
      console.log("Register successful:", response.data);
      toast.success("Đăng ký thành công!");
      navigate("/auth/login");
    } catch (error) {
      console.error("Register failed:", error);
      toast.error("Đăng ký thất bại, vui lòng thử lại!");
    }
  };
  const password = watch("password");
  return (
    <>
      <div className="text-center my-6">
        <h2 className="text-2xl font-bold text-gray-800">Đăng ký</h2>
      </div>

      <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="flex items-center gap-4 justify-center mb-6">
          <button className="flex w-48 h-14 items-center justify-center gap-3.5 rounded-lg border-2 border-gray-300 bg-white font-bold hover:bg-gray-100">
            <img src={LogoGG} alt="Google" className="h-6" />
            Google
          </button>
          <button className="flex w-48 h-14 items-center justify-center rounded-lg border-2 border-gray-300 bg-white font-bold hover:bg-gray-100">
            <img src={LogoFb} alt="Facebook" className="h-6" />
            Facebook
          </button>
        </div>

        <div className="flex items-center gap-2 mb-8">
          <hr className="w-full border-gray-300" />
          hoặc
          <hr className="w-full border-gray-300" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Tên tài khoản */}
          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-700">
              Họ tên
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Nhập tài khoản"
                className="w-full rounded-lg border border-gray-300 py-4 pl-6 pr-10 outline-none focus:ring-2 focus:ring-primary"
                {...register("username", {
                  required: "Tên là bắt buộc",
                  minLength: {
                    value: 2,
                    message: "Tên phải chứa ít nhất 2 ký tự",
                  },
                })}
              />
              <span className="absolute right-4 top-4">
                <FontAwesomeIcon icon={faUser} className="text-gray-400" />
              </span>
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-700">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="Nhập email"
                className="w-full rounded-lg border border-gray-300 py-4 pl-6 pr-10 outline-none focus:ring-2 focus:ring-primary"
                {...register("email", {
                  required: "Email là bắt buộc",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Email không hợp lệ",
                  },
                })}
              />
              <span className="absolute right-4 top-4">
                <FontAwesomeIcon icon={faEnvelope} className="text-gray-400" />
              </span>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          {/* Liên hệ */}
          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-700">
              Số điện thoại
            </label>
            <div className="relative">
              <input
                type="tel"
                placeholder="Nhập số điện thoại"
                className="w-full rounded-lg border border-gray-300 py-4 pl-6 pr-10 outline-none focus:ring-2 focus:ring-primary"
                {...register("contact", {
                  required: "Số điện thoại là bắt buộc",
                  pattern: {
                    value: /^[0-9]{10,11}$/,
                    message: "Số điện thoại không hợp lệ",
                  },
                })}
              />
              <span className="absolute right-4 top-4">
                <FontAwesomeIcon icon={faPhone} className="text-gray-400" />
              </span>
              {errors.contact && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.contact.message}
                </p>
              )}
            </div>
          </div>

          {/* Mật khẩu */}
          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-700">
              Mật khẩu
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Nhập mật khẩu"
                className="w-full rounded-lg border border-gray-300 py-4 pl-6 pr-10 outline-none focus:ring-2 focus:ring-primary"
                {...register("password", {
                  required: "Mật khẩu là bắt buộc",
                  minLength: {
                    value: 8,
                    message: "Mật khẩu phải chứa ít nhất 8 ký tự",
                  },
                })}
              />
              <span className="absolute right-4 top-4 cursor-pointer">
                <FontAwesomeIcon
                  icon={faEyeSlash}
                  className="text-gray-400"
                  onClick={togglePasswordVisibility}
                />
              </span>
              {errors.password && (
                <p className="text-red-500 mt-1">{errors.password.message}</p>
              )}
            </div>
          </div>

          {/* Nhập lại mật khẩu */}
          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-700">
              Nhập lại mật khẩu
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Nhập lại mật khẩu"
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none"
                {...register("confirmPassword", {
                  validate: (value) =>
                    value === password || "Mật khẩu không khớp",
                })}
              />
              <span className="absolute right-4 top-4 cursor-pointer">
                <FontAwesomeIcon
                  icon={faEyeSlash}
                  className="text-gray-400"
                  onClick={togglePasswordVisibility}
                />
              </span>
              {errors.confirmPassword && (
                <p className="text-red-500 mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 text-white bg-primary rounded-lg font-bold hover:bg-red-600"
          >
            Đăng ký
          </button>

          <div className="text-center mt-4">
            <p>
              Bạn đã có tài khoản?{" "}
              <Link to="/auth/login" className="text-blue-600 hover:underline">
                Đăng nhập
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
