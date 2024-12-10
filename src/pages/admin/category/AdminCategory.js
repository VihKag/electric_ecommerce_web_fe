import React, { useEffect, useState } from "react";
import {
  Table,
  Space,
  Button,
  Input,
  Tag,
  Modal,
  Form,
  Upload,
  message,
  Image,
  Switch,
} from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { adminService, categoryService } from "../../../services/apiService";
import { toast } from "react-toastify";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingCategory, setEditingCategory] = useState(null);
  const [imageFile, setImageFile] = useState([]);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const handleTableChange = (pagination, filters, sorter) => {
    setPagination(pagination);
    if (sorter && "field" in sorter && "order" in sorter) {
      setSortField(sorter.field);
      setSortOrder(sorter.order === "descend" ? "desc" : "asc");
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      sorter: (a, b) => a._id.localeCompare(b._id),
      width: 280,
    },
    {
      title: "Image",
      dataIndex: "images",
      key: "images",
      render: (images) => <Image src={images} alt="Category" width={50} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status ? "green" : "red"}>
          {status ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) =>
        new Date(date).toLocaleDateString("vi-VN", {
          timeZone: "Asia/Ho_Chi_Minh",
        }),
      sorter: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record._id)}
          />
        </Space>
      ),
    },
  ];

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await adminService.getCategories({
        params: {
          page: pagination.current,
          pageSize: pagination.pageSize,
          sortField,
          sortOrder,
          search: searchText,
        },
      });
      setCategories(response.data.data.categories);
      setTotal(response.data.data.totalCategories);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      message.error("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    form.setFieldsValue();
    setIsModalVisible(true);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    form.setFieldsValue({
      name: category.name,
      status: category.status,
    });
    setIsModalVisible(true);
  };

  useEffect(() => {
    fetchCategories();
  }, [pagination, sortField, sortOrder, searchText, categories]);

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Bạn có chắc muốn xóa danh mục này?",
      onOk: async () => {
        try {
          categoryService.deleteCategoryById(id);
          toast.success("Xóa thành công");
          setCategories((prevCategories) =>
            prevCategories.filter((category) => category._id !== id)
          );
        } catch (error) {
          console.log(error);
          toast.error("Xóa thất bại");
        }
      },
    });
  };
  const handleModalOk = () => {
    form.validateFields().then(async (values) => {
      try {
        const formData = new FormData();
        formData.append("name", values.name); // Thêm tên
        formData.append("status", values.status ? "true" : "false"); // Thêm trạng thái

        if (imageFile) {
          imageFile.forEach((file) => {
            formData.append("images", file.originFileObj); // Thêm file thực
          });
        } else {
          console.log("No image selected");
        }

        for (let [key, value] of formData.entries()) {
          console.log(`${key}:`, value);
        }
        let response;
        if (editingCategory) {
          // Nếu đang chỉnh sửa danh mục
          formData.append("idproduct", editingCategory._id);
          response = await categoryService.updateCategory(editingCategory._id,formData);
        } else {
          // Nếu tạo mới danh mục
          response = await categoryService.createCategory("noId",formData);
        }

        if (response.data.success) {
          toast.success(response.data.message);
          setIsModalVisible(false);
          form.resetFields();
          setEditingCategory(null);
          setImageFile(null);
          fetchCategories(); // Reload lại danh sách
        } else {
          toast.error(response.data.message || "Failed to save category");
        }
      } catch (error) {
        console.error("Failed to save category:", error);
        toast.error("Failed to save category");
      }
    });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingCategory(null);
    setImageFile(null);
  };

  const handleChange = (info) => {
    console.log("Selected files:", info.fileList); // Kiểm tra danh sách file
    setImageFile(info.fileList); // Lưu toàn bộ danh sách file vào state
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Categories Management</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => handleAdd()}
        >
          Add Category
        </Button>
      </div>
      <Input
        placeholder="Search categories"
        prefix={<SearchOutlined />}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="mb-4"
        style={{ width: 200 }}
      />
      <Table
        columns={columns}
        dataSource={categories}
        rowKey="_id"
        pagination={{
          ...pagination,
          total,
          pageSizeOptions: ["5", "10", "20", "50"],
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `Total ${total} items`,
        }}
        loading={loading}
        onChange={handleTableChange}
      />
      <Modal
        title={editingCategory ? "Edit Category" : "Add New Category"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Category Name"
            rules={[
              { required: true, message: "Please input the category name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="images" label="Image">
            <Upload
              beforeUpload={() => false}
              onChange={handleChange}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Select Image</Button>
            </Upload>
          </Form.Item>
          <Form.Item name="status" label="Status" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminCategories;
