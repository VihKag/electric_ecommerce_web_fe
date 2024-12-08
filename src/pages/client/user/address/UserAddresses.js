import { useState, useEffect } from "react";
import { Form, List, Radio, Modal, Button } from "antd";
import {
  CloseOutlined,
  HomeOutlined,
  PlusOutlined,
  EditOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import AddressModal from "../../../../components/modal/AddressModal";

const AddressList = () => {
  const user = useSelector((state) => state.auth.user);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:4000/address/${user.id}`
      );
      setAddresses(response.data.data);
    } catch (error) {
      toast.error("Error loading addresses");
    } finally {
      setLoading(false);
    }
  };

  const handleSetDefault = async (id) => {
    try {
      setAddresses((prev) =>
        prev.map((addr) => ({
          ...addr,
          status: addr._id === id,
        }))
      );
      toast.success("Default address updated");
    } catch (error) {
      toast.error("Failed to update default address");
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const payload = {
        userId: user.id,
        address: `${values.house}, ${values.ward}, ${values.district}, ${values.province}`,
        name: values.name,
        phone: values.phone,
        status: true,
      };

      const response = await axios.post(
        "http://127.0.0.1:4000/address/create",
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        toast.success("Địa chỉ đã được thêm thành công!");
        form.resetFields();
        setIsModalOpen(false);
        fetchAddresses();
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Thêm địa chỉ thất bại!");
      } else if (error.request) {
        toast.error("Không thể kết nối đến máy chủ!");
      } else {
        toast.error("Đã xảy ra lỗi. Vui lòng thử lại!");
      }
      console.error(error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleDeleteAddress = async (addressId) => {
    Modal.confirm({
      title: "Bạn có chắc chắn muốn xóa địa chỉ này?",
      content: "Hành động này không thể hoàn tác!",
      okText: "Có",
      cancelText: "Không",
      onOk: async () => {
        try {
          const response = await axios.delete(
            `http://127.0.0.1:4000/address/user/${user.id}/location/${addressId}`
          );
          if (response.status === 200) {
            toast.success("Địa chỉ đã được xóa thành công!");
            fetchAddresses();
          }
        } catch (error) {
          if (error.response) {
            toast.error(error.response.data.message || "Xóa địa chỉ thất bại!");
          } else if (error.request) {
            toast.error("Không thể kết nối đến máy chủ!");
          } else {
            toast.error("Đã xảy ra lỗi. Vui lòng thử lại!");
          }
        }
      },
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <AddressModal
        handleCancel={handleCancel}
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        form={form}
      />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
          <HomeOutlined className="text-blue-500" />
          Sổ địa chỉ
        </h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 border-blue-500 hover:border-blue-600"
        >
          Thêm địa chỉ mới
        </Button>
      </div>

      <List
        loading={loading}
        dataSource={addresses}
        renderItem={(item) => (
          <List.Item className="border rounded-lg mb-4 hover:shadow-lg transition-shadow bg-gray-50">
            <div className="w-full flex items-start justify-between gap-4">
              <div className="flex-grow px-3">
                <p className="text-gray-600 flex items-center gap-2">
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
                  </svg>{" "}
                  {item.phone}
                </p>
                <p className="text-gray-600 flex items-center gap-2">
                  {" "}
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
                  </svg>{" "}
                  {item.address}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Radio
                  checked={item.status}
                  onChange={() => handleSetDefault(item._id)}
                >
                  <span className="text-gray-700">Mặc định</span>
                </Radio>
                <div className="flex gap-2">
                  <Button
                    type="text"
                    icon={<CloseOutlined />}
                    className="text-red-500 hover:text-red-600 hover:bg-red-100"
                    onClick={() => handleDeleteAddress(item._id)}
                  />
                </div>
              </div>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default AddressList;
