import React, { useState } from "react";
import { Modal, Form, Input, Upload, message, Select, Switch } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { productService } from "../../services/apiService";
import { toast } from "react-toastify";

const { TextArea } = Input;
const { Option } = Select;
const UpdateCategoryModal = ({ visible, onCancel, onUpdate, category }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const handleUpdate = async (values) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("status", values.status);
      fileList.forEach((file) => {
        formData.append("images", file.originFileObj);
      });

      await productService.updateProduct(formData);
      message.success("Product updated successfully");
      onUpdate();
      onCancel();
    } catch (error) {
      console.error("Failed to update category:", error);
      message.error("Failed to update category");
    }
  };

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

  return (
    <Modal
      visible={visible}
      title="CẬP NHẬT DANH MỤC"
      onCancel={onCancel}
      onOk={() => form.submit()}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          name: category.name,
          images: category.images,
          status: category.status,
        }}
        onFinish={handleUpdate}
      >
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="images" label="Images">
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={handleFileChange}
            beforeUpload={() => false}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Switch checked={category.status} />
        </Form.Item>

      </Form>
    </Modal>
  );
};

export default UpdateCategoryModal;
