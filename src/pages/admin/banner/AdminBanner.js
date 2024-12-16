import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  message,
  Image,
  Upload,
} from "antd";
import axios from "axios";
import { UploadOutlined } from "@ant-design/icons";
import { commonService } from "../../../services/apiService";
const AdminBanner = () => {
  const [banners, setBanners] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

  // Fetch banners
  const fetchBanners = async () => {
    try {
      const { data } = await axios.get("http://127.0.0.1:4000/banners");
      setBanners(data.data);
    } catch (err) {
      message.error("Failed to fetch banners");
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  // Add or Update banner
  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);

      fileList.forEach((file) => {
        formData.append("images", file.originFileObj);
      });
      formData.append("idbanner", editingBanner?._id);
      if (editingBanner) {
        // Update banner
        await axios.put(`http://127.0.0.1:4000/banners`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        message.success("Banner updated successfully");
      } else {
        // Add new banner
        await axios.post("http://127.0.0.1:4000/banners/create", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        message.success("Banner added successfully");
      }
      setFileList([]);
      fetchBanners();
      setIsModalOpen(false);
      setEditingBanner(null);
      form.resetFields();
    } catch (err) {
      message.error("Operation failed");
    }
  };

  // Delete banner
  const handleDelete = async (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this banner?",
      content: "This operation cannot be undone.",
      okText: "Yes",
      cancelText: "No",
      onOk: async () => {
        try {
          await commonService.deleteBanner(id);
          setBanners(banners.filter((banner) => banner._id !== id));
          message.success("Banner deleted successfully");
        } catch (error) {
          console.log(error);
          message.error("Error deleting banner");
        }
      },
    });
  };
  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-semibold">Banner Management</h2>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Add Banner
        </Button>
      </div>
      <Table
        dataSource={banners}
        columns={[
          {
            title: "ID",
            dataIndex: "_id",
            key: "_id",
            render: (id) => id,
          },
          { title: "Name", dataIndex: "name", key: "name" },
          {
            title: "Image",
            dataIndex: "images",
            key: "image",
            render: (images) =>
              images?.length > 0 ? (
                <Image src={images} alt="banner" width={60} height={60} />
              ) : (
                "No Image"
              ),
          },

          { title: "Link", dataIndex: "images", key: "link" },
          {
            title: "Description",
            dataIndex: "description",
            key: "description",
          },
          {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    setEditingBanner(record);
                    form.setFieldsValue({
                      name: record.name,
                      description: record.description,
                    });
                    setIsModalOpen(true);
                  }}
                >
                  Edit
                </Button>
                <Button danger onClick={() => handleDelete(record._id)}>
                  Delete
                </Button>
              </div>
            ),
          },
        ]}
        rowKey="_id"
        scroll={{ x: 1200 }}
      />
      <Modal
        title={editingBanner ? "Edit Banner" : "Add Banner"}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingBanner(null);
          form.resetFields();
        }}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter banner name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="image" label="Image">
            <Upload
              listType="picture"
              maxCount={1}
              fileList={fileList}
              onChange={handleChange}
              beforeUpload={() => false}
            >
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminBanner;
