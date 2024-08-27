import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useNavigation } from "react-router-dom";
export default function RestorePassword() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/auth/login");
  };
  return (
    <>
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
        <form>
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
                className="w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full cursor-pointer rounded-lg border border-blue-500 bg-blue-500 p-4 text-white font-bold transition hover:bg-opacity-90"
          >
            Reset Password
          </button>
        </form>
      </div>
    </>
  );
}
