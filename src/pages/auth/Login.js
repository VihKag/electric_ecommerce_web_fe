import { faEye, faEyeSlash, faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoGG from "../../assets/icon/logoGG.png";
import LogoFb from "../../assets/icon/logoFb.png";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { clientLoginAsync } from "../../redux/slices/authSlice";
import { message, Spin } from "antd";
import { fetchCart } from "../../redux/slices/cartSlice";
function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }} = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  //use redux to login
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (data) => {
    dispatch(clientLoginAsync(data))
    .unwrap() //  to extract the payload of a fulfilled action or to throw either the error
    .then((result)=>{
      if(result.status===200){
        message.success("Đăng nhập thành công!");
        const user = JSON.parse(localStorage.getItem("user"));
        console.log(user);
        dispatch(fetchCart(user.id));
        navigate('/');
      }
    })
    .catch((error) => {
      // error contains the payload from the rejected action
      if (error.status === 404) {
        message.error("Tài khoản không tồn tại");
      } else if (error.status === 401) {
        message.error("Sai mật khẩu");
      } else {
        message.error("Đăng nhập thất bại");
      }
      console.log(error);
    });
  };
  return (
    <>
      <div className="mx-auto my-6">
        <h2 className="mx-auto w-max">Đăng nhập</h2>
      </div>

      <div className="max-w-[700px] min-w-[280px] mx-auto pb-10">
        <form onSubmit={handleSubmit(onSubmit)}>
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
                {...register("email", {
                  required: "Tài khoản là bắt buộc",
                  minLength: {
                    value: 6,
                    message: "Tài khoản phải chứa ít nhất 6 ký tự",
                  },
                })}
              />
              <span className="absolute right-4 top-4">
                <FontAwesomeIcon icon={faUser} className="text-gray-400" />
              </span>
              {errors.email && (
                <p className="text-red-500 mt-1">{errors.email.message}</p>
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
                  onClick={togglePasswordVisibility}
                  icon={showPassword ? faEye : faEyeSlash}
                  className="text-gray-400"
                  id="icon-password"
                />
              </span>
              {errors.password && (
                <p className="text-red-500 mt-1">{errors.password.message}</p>
              )}
            </div>
            <div className="text-secondary m-2 justify-end flex hover:text-primary">
              <Link to="/auth/restore-password">Quên mật khẩu?</Link>
            </div>
          </div>

          {/* Nút đăng nhập */}
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
              <Link to="/auth/register" className="text-primary font-bold">
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
