import { faEyeSlash, faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import LogoGG from "../../assets/icon/logoGG.png";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import LogoFb from "../../assets/icon/logoFb.png";
import { useForm } from "react-hook-form";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch, // để theo dõi giá trị nhập liệu
  } = useForm({
    defaultValues: {
      fullname: "",
      phone: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    console.log("Submitted data:", data);
    // Xử lý dữ liệu đăng ký ở đây (gửi lên server hoặc API)
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const password = watch("password"); // Để kiểm tra mật khẩu và xác nhận mật khẩu

  return (
    <>
      <div className="mx-auto my-6">
        <h2 className="mx-auto w-max">Đăng ký</h2>
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

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Họ tên */}
          <div className="mb-4">
            <label className="mb-2.5 block font-medium text-black">
              Họ tên
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Nhập họ tên"
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none"
                {...register("fullname", { required: "Họ tên là bắt buộc" })}
              />
              {errors.fullname && (
                <p className="text-red-500 mt-1">{errors.fullname.message}</p>
              )}
            </div>
          </div>

          {/* Số điện thoại */}
          <div className="mb-4">
            <label className="mb-2.5 block font-medium text-black">
              Số điện thoại
            </label>
            <div className="relative">
              <input
                type="tel"
                placeholder="Nhập số điện thoại"
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none"
                {...register("phone", {
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
              {errors.phone && (
                <p className="text-red-500 mt-1">{errors.phone.message}</p>
              )}
            </div>
          </div>

          {/* Tài khoản */}
          <div className="mb-4">
            <label className="mb-2.5 block font-medium text-black">
              Tài khoản
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Nhập tài khoản"
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none"
                {...register("username", {
                  required: "Tài khoản là bắt buộc",
                  minLength: {
                    value: 4,
                    message: "Tài khoản phải chứa ít nhất 4 ký tự",
                  },
                })}
              />
              <span className="absolute right-4 top-4">
                <FontAwesomeIcon icon={faUser} className="text-gray-400" />
              </span>
              {errors.username && (
                <p className="text-red-500 mt-1">{errors.username.message}</p>
              )}
            </div>
          </div>

          {/* Mật khẩu */}
          <div className="mb-4">
            <label className="mb-2.5 block font-medium text-black">
              Mật khẩu
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Nhập mật khẩu"
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none"
                {...register("password", {
                  required: "Mật khẩu là bắt buộc",
                  minLength: {
                    value: 6,
                    message: "Mật khẩu phải chứa ít nhất 6 ký tự",
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
            <label className="mb-2.5 block font-medium text-black">
              Nhập lại mật khẩu
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="Nhập lại mật khẩu"
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none"
                {...register("confirmPassword", {
                  validate: (value) =>
                    value === password || "Mật khẩu không khớp",
                })}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <input
              type="submit"
              value="Đăng ký"
              className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white font-bold transition hover:bg-opacity-90"
            />
          </div>

          <div className="mt-6 text-center">
            <p>
              Bạn đã có tài khoản?{" "}
              <Link
                to="/auth/login"
                className="hover:text-blue-500 text-primary font-bold"
              >
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
