import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Upload, message, Select, Switch } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { adminService, productService } from "../../services/apiService";
import { toast } from "react-toastify";

const { TextArea } = Input;
const { Option } = Select;
const UpdateProductModal = ({ visible, onCancel, onUpdate, product }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const fetchBrands = async () => {
    try {
      const response = await adminService.getBrands();
      console.log("brands: ", response.data.data);
      setBrands(response.data.data.brands);
    } catch (error) {
      console.log(error.message);
      return;
    }
  };
  const fetchCategories = async () => {
    try {
      const response = await adminService.getCategories();
      console.log("categories: ", response.data.data);
      setCategories(response.data.data.categories);
    } catch (error) {
      console.log(error.message);
      return;
    }
  };
  useEffect(() => {
    fetchBrands();
    fetchCategories();
  }, []);
  const handleUpdate = async (values) => {
    try {
      const formData = new FormData();
      formData.append("idproduct", product.productId);
      formData.append("name", values.name);
      formData.append("category", values.category);
      formData.append("brand", values.brand);
      formData.append("description", values.description);
      formData.append("status", values.status);
      fileList.forEach((file) => {
        formData.append("images", file.originFileObj);
      });
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      await productService.updateProduct(formData);
      message.success("Product updated successfully");
      onUpdate();
      onCancel();
    } catch (error) {
      console.error("Failed to update product:", error);
      message.error("Failed to update product");
    }
  };

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

  return (
    <Modal
    className="mt-24"
      visible={visible}
      title="CẬP NHẬT SẢN PHẨM"
      onCancel={onCancel}
      onOk={() => form.submit()}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          name: product?.name,
          category: product?.category?._id,
          brand: product?.brand?._id,
          description: product?.description,
          status: product?.status
        }}
        onFinish={handleUpdate}
      >
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="category" label="Category">
          <Select placeholder="Chọn danh mục">
            {categories?.map((cate) => (
              <Select.Option key={cate._id}  value={cate._id}>
                {cate.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="brand" label="Brand">
          <Select placeholder="Chọn thương hiệu">
            {brands?.map((brand) => (
              <Option key={brand._id} value={brand._id}>
                {brand.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="description" label="Description">
          <TextArea rows={4} />
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
        <Form.Item name="status" label="Status" valuePropName="checked">
          <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateProductModal;
