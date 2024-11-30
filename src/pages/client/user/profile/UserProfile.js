import React, { useState } from "react";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: user.username || "",
      email: user.email || "",
      bonuspoint: user.bonuspoint || 0,
    },
  });

  const onSubmit = (data) => {
    dispatch();
    setIsEditing(false);
  };
  const cancelEditing = () => {
    reset();
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Hồ sơ tài khoản
            </h1>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-blue-500 text-white px-4 py-2 rounded flex items-center hover:bg-blue-600 transition"
            >
              <EditOutlined className="mr-2" />
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="px-4 py-5 sm:p-6">
            <div className="flex justify-center mb-6">
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                <img
                  src={user.image}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Họ tên
                </label>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: "Name is required" }}
                  render={({ field }) => (
                    <div className="mt-1 relative">
                      <UserOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        {...field}
                        disabled={!isEditing}
                        className={`w-full pl-10 pr-3 py-2 border rounded-md ${
                          isEditing
                            ? "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            : "bg-gray-100 cursor-not-allowed"
                        }`}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  }}
                  render={({ field }) => (
                    <div className="mt-1 relative">
                      <MailOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        {...field}
                        type="email"
                        disabled={!isEditing}
                        className={`w-full pl-10 pr-3 py-2 border rounded-md ${
                          isEditing
                            ? "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            : "bg-gray-100 cursor-not-allowed"
                        }`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>

              {/* Bonus point Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Điểm thưởng
                </label>
                <Controller
                  name="bonuspoint"
                  control={control}
                  rules={{ required: "Phone number is required" }}
                  render={({ field }) => (
                    <div className="mt-1 relative">
                      <PhoneOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        {...field}
                        disabled
                        className={`w-full pl-10 pr-3 py-2 border rounded-md bg-gray-100 cursor-not-allowed'
                        }`}
                      />
                      {errors.bonuspoint && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.bonuspoint.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>

            {isEditing && (
              <div className="mt-6 flex space-x-4">
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                >
                  Lưu thay đổi
                </button>
                <button
                  type="button"
                  onClick={cancelEditing}
                  className="w-full bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400 transition"
                >
                  Hủy
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
