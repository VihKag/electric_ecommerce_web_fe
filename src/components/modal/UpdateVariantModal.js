import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, InputNumber } from "antd";
import { toast } from "react-toastify";
import { adminService } from "../../services/apiService";

const UpdateVariantsModal = ({ visible, onCancel, onUpdate, variant }) => {
  const [formData, setFormData] = useState(variant || {});
  console.log("Variant khi mở Modal:", JSON.stringify(variant));
  // Đồng bộ formData với variant khi variant thay đổi
  useEffect(() => {
    if (variant) {
      setFormData(variant);
    }
  }, [variant]);

  const handleSubmit = async () => {
    try {
      // Gọi API update variant cụ thể
      const response = await adminService.updateVariants(variant._id, formData);
      console.log(response.data);
      toast.success("Cập nhật variant thành công!");
      onUpdate();
      onCancel();
    } catch (error) {
      console.error(error);
      toast.error("Cập nhật variant thất bại");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Xử lý nested price
    if (name.startsWith("price.")) {
      const priceField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        price: {
          ...prev.price,
          [priceField]: Number(value),
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: name === "stockQuantity" ? Number(value) : value,
      }));
    }
  };

  return (
    <Modal
      title="Cập nhật Variant"
      visible={visible}
      onCancel={onCancel}
      onOk={handleSubmit}
    >
      <Form layout="vertical">
        <Form.Item
          label="Màu sắc"
          rules={[{ required: true, message: "Vui lòng nhập màu sắc" }]}
        >
          <Input
            name="color"
            value={formData?.color}
            onChange={handleInputChange}
            placeholder="Nhập màu sắc"
          />
        </Form.Item>

        <Form.Item
          label="Giá gốc"
          rules={[{ required: true, message: "Vui lòng nhập giá gốc" }]}
        >
          <InputNumber
            name="price.initial"
            value={formData?.price?.initial}
            onChange={(value) =>
              handleInputChange({
                target: { name: "price.initial", value },
              })
            }
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            min={0}
            style={{ width: "100%" }}
            placeholder="Nhập giá gốc"
          />
        </Form.Item>

        <Form.Item label="Giá khuyến mãi">
          <InputNumber
            name="price.discount"
            value={formData?.price?.discount}
            onChange={(value) =>
              handleInputChange({
                target: { name: "price.discount", value },
              })
            }
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            min={0}
            style={{ width: "100%" }}
            placeholder="Nhập giá khuyến mãi (để trống nếu không có)"
          />
        </Form.Item>

        <Form.Item
          label="Số lượng tồn kho"
          rules={[{ required: true, message: "Vui lòng nhập số lượng tồn kho" }]}
        >
          <InputNumber
            name="stockQuantity"
            value={formData?.stockQuantity}
            onChange={(value) =>
              handleInputChange({
                target: { name: "stockQuantity", value },
              })
            }
            min={0}
            style={{ width: "100%" }}
            placeholder="Nhập số lượng tồn kho"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateVariantsModal;
