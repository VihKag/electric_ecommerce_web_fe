import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useNavigation } from "react-router-dom";
import { authService } from "../../services/apiService";
import { toast } from "react-toastify";
import { message } from "antd";
export default function RestorePassword() {
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [otpTimer, setOtpTimer] = useState(300); // 5 minutes = 300 seconds
  const [otpCode, setOtpCode] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const handleBack = () => {
    navigate('/auth/login');
  };
  const handleVerifyEmail = async (email) => {
    try {
      const response = await authService.verifyEmail(email);
        setIsOtpModalOpen(true);
        startOtpTimer();
    } catch (error) {
      setError((prev) => ({...prev, email: error.response.data.message}));
      console.error("Failed to verify email", error);
    }
  };

  const startOtpTimer = () => {
    const timer = setInterval(() => {
      setOtpTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(timer);
           resetOtpState(); // Reset trạng thái khi hết thời gian
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  const handleOtpSubmit = async () => {
    try {
      const response = await authService.sendOTP(email, otpCode);

      if (response.data.success) {
        // OTP validated successfully
        setIsOtpModalOpen(false);
        setError((prev) => ({ ...prev, otp: null}));
        message.success(response.data.message);
        navigate("/auth/change-password", { state: { email } });
      }
    } catch (error) {
      setError((prev) => ({...prev, otp: error.response.data.message}));
      console.error("OTP validation failed", error);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const resetOtpState = () => {
    setIsOtpModalOpen(false);
    setOtpCode("");
    setOtpTimer(300);
    setError((prev) => ({ ...prev, otp: null}));
    setEmail("");
  };
  return (
    <>
      {isOtpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg relative">
            <h2 className="text-xl font-semibold mb-4">Vui lòng nhập mã OTP</h2>
            <p className="mb-4">Thời gian còn lại: {formatTime(otpTimer)}</p>
            {error.otp && (
              <p className="text-red-500 text-sm mb-4">{error.otp}</p>
            )}
            <input
              type="text"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
              placeholder="Enter OTP"
              className="w-full mb-4 p-2 border rounded"
            />
            <button
              onClick={handleOtpSubmit}
              className="w-full bg-primary text-white p-2 rounded disabled:opacity-50"
              disabled={otpTimer === 0}
            >
              Nhập OTP
            </button>
            <button
              onClick={() => setIsOtpModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      <div className="max-w-[700px] min-w-[280px] mx-auto pb-10">
        <div className="mx-auto my-6 ">
          <div
            className="turn-back h-8 w-8 hover:cursor-pointer"
            onClick={handleBack}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </div>
          <h2 className="mx-auto w-max">Quên mật khẩu</h2>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault(); // Ngăn chặn hành động submit mặc định
            setError((prev)=>({...prev, email: null}));
            handleVerifyEmail(email); // Truyền email vào hàm xử lý
          }}
        >
          <div className="mx-auto mb-4">
            <label
              htmlFor="email"
              className="mb-2.5 block font-medium text-black"
            >
              Email
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Nhập email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Cập nhật email state
                className="w-full rounded-lg border bg-transparent py-3 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none"
              />
            </div>
            {error.email && (
              <p className="text-red-500 text-base mb-4 mt-1">{error.email}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full cursor-pointer rounded-lg border bg-primary p-2 text-white font-semibold transition hover:bg-opacity-90"
          >
            Tiêp tục
          </button>
        </form>
      </div>
    </>
  );
}
