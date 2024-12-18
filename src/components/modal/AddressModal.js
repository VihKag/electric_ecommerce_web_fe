import { Input, Modal, Select, Form, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const { Option } = Select;

const AddressModal = ({ form, isModalOpen, handleCancel, handleOk }) => {
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingWards, setLoadingWards] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProvinces = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://vapi.vnappmob.com/api/v2/province/"
      );
      if (response.data && response.data.results) {
        setProvinces(response.data.results);
      }
    } catch (error) {
      message.error("Không thể tải danh sách địa chỉ!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDistricts = async (provinceName) => {
    setLoadingDistricts(true);
    try {
      const selectedProvince = provinces.find(
        (province) => province.province_name === provinceName
      );
      if (selectedProvince) {
        const response = await axios.get(
          `https://vapi.vnappmob.com/api/v2/province/district/${selectedProvince.province_id}`
        );
        setDistricts(response.data.results || []);
      }
    } catch (error) {
      message.error("Không thể tải danh sách quận/huyện!");
      console.error(error);
    } finally {
      setLoadingDistricts(false);
    }
  };

  const fetchWards = async (districtName) => {
    setLoadingWards(true);
    try {
      const selectedDistrict = districts.find(
        (district) => district.district_name === districtName
      );
      if (selectedDistrict) {
        const response = await axios.get(
          `https://vapi.vnappmob.com/api/v2/province/ward/${selectedDistrict.district_id}`
        );
        setWards(response.data.results || []);
      }
    } catch (error) {
      message.error("Không thể tải danh sách phường/xã!");
      console.error(error);
    } finally {
      setLoadingWards(false);
    }
  };

  useEffect(() => {
    fetchProvinces();
  }, []);

  return (
    <Modal
      title="Thêm địa chỉ mới"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Lưu"
      cancelText="Hủy"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Tỉnh/Thành phố"
          name="province"
          rules={[{ required: true, message: "Vui lòng chọn tỉnh/thành phố!" }]}
        >
          <Select
            showSearch
            placeholder="Chọn tỉnh/thành phố"
            loading={loading}
            onChange={(value) => fetchDistricts(value)}
          >
            {provinces.map((province) => (
              <Option key={province.province_name} value={province.province_name}>
                {province.province_name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Quận/Huyện"
          name="district"
          rules={[{ required: true, message: "Vui lòng chọn quận/huyện!" }]}
        >
          <Select
            showSearch
            placeholder="Chọn quận/huyện"
            loading={loadingDistricts}
            onChange={(value) => fetchWards(value)}
          >
            {districts.map((district) => (
              <Option key={district.district_name} value={district.district_name}>
                {district.district_name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Phường/Xã"
          name="ward"
          rules={[{ required: true, message: "Vui lòng chọn phường/xã!" }]}
        >
          <Select
            showSearch
            placeholder="Chọn phường/xã"
            loading={loadingWards}
          >
            {wards.map((ward) => (
              <Option key={ward.ward_name} value={ward.ward_name}>
                {ward.ward_name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Địa chỉ nhà"
          name="house"
          rules={[
            { required: true, message: "Vui lòng nhập địa chỉ chi tiết!" },
          ]}
        >
          <Input placeholder="Nhập địa chỉ chi tiết" />
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          name="phone"
          rules={[
            { required: true, message: "Vui lòng nhập số điện thoại!" },
            {
              pattern: /^(\+84|0)\d{9,10}$/,
              message: "Số điện thoại không hợp lệ!",
            },
            {
              max: 11,
              message: "Số điện thoại không được dài hơn 11 ký tự!",
            },
            {
              min: 10,
              message: "Số điện thoại phải dài ít nhất 10 ký tự!",
            },
          ]}
        >
          <Input type="tel" placeholder="Số điện thoại" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddressModal;
