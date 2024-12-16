import React, { useEffect, useState } from "react";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  EditOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { commonService } from "../../../../services/apiService";
import { Form, Modal, Select, message } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import AddressModal from "../../../../components/modal/AddressModal";
const { Option } = Select;

export default function UserProfile() {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [addresses, setAddresses] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
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

  const getAddressByUserId = async () => {
    try {
      const response = await commonService.getAddresseByUserIdDefault(user.id);
      console.log("addresses: ", response.data.data);
      setAddresses(response.data.data);
    } catch (error) {
      console.log("addresses: ", error);
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const payload = {
        userId: user.id, // Thay bằng ID thực tế của người dùng
        address: `${values.house}, ${values.ward}, ${values.district}, ${values.province}`,
        name: values.name, // Hoặc giá trị từ form nếu cần
        phone: values.phone,
        status: true,
      };
      const response = await commonService.createAddress(payload);
      if (response.status === 200) {
        message.success("Địa chỉ đã được thêm thành công!");
        form.resetFields();
        setIsModalOpen(false);
        // Reload lại trang
        window.location.reload();
      }
    } catch (error) {
      if (error.response) {
        // Lỗi từ server (có phản hồi)
        message.error(error.response.data.message || "Thêm địa chỉ thất bại!");
      } else if (error.request) {
        // Lỗi không nhận được phản hồi từ server
        message.error("Không thể kết nối đến máy chủ!");
      } else {
        // Lỗi khác
        message.error("Đã xảy ra lỗi. Vui lòng thử lại!");
      }
      console.error(error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleDeleteAddress = async (addressId) => {
    // Xác nhận hành động xóa
    Modal.confirm({
      title: "Bạn có chắc chắn muốn xóa địa chỉ này?",
      content: "Hành động này không thể hoàn tác!",
      okText: "Có",
      cancelText: "Không",
      onOk: async () => {
        try {
          const response = await commonService.deleteAddress(user.id,addressId);
          if (response.status === 200) {
            message.success("Địa chỉ đã được xóa thành công!");
            getAddressByUserId(); // Cập nhật lại danh sách địa chỉ sau khi xóa
          }
        } catch (error) {
          if (error.response) {
            message.error(
              error.response.data.message || "Xóa địa chỉ thất bại!"
            );
          } else if (error.request) {
            message.error("Không thể kết nối đến máy chủ!");
          } else {
            message.error("Đã xảy ra lỗi. Vui lòng thử lại!");
          }
        }
      },
      onCancel: () => {
        console.log("Xóa địa chỉ bị hủy");
      },
    });
  };
  useEffect(() => {
    getAddressByUserId();
  }, []);
  return (
    <div className="px-2 md:flex md:gap-2">
      <AddressModal
        handleCancel={handleCancel}
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        form={form}
      />

      <div className="md:w-2/3 mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
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

      <div className="md:w-1/3 mx-auto mt-2 md:mt-0">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Địa chỉ mặc định
            </h1>
            {addresses.length > 0 ? (
              <button
                onClick={() => handleDeleteAddress(addresses[0]._id)}
                className="p-2 rounded flex items-center"
              >
                <CloseOutlined />
              </button>
            ) : null}
          </div>

          {addresses.length > 0 ? (
            <div className="w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="space-y-4 px-6">
                <div className="flex items-start">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    ></path>
                  </svg>
                  <div>
                    <p className="font-medium text-gray-700">Address</p>
                    <p className="text-gray-600">{addresses[0].address}</p>
                  </div>
                </div>
                <div className="flex items-start pb-4">
                  <svg
                    className="w-5 h-5 text-red-500 mr-2 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    ></path>
                  </svg>
                  <div>
                    <p className="font-medium text-gray-700">Phone</p>
                    <p className="text-gray-600">{addresses[0].phone}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-600 pb-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-500 text-white p-2 rounded-md"
              >
                + Thêm địa chỉ
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

